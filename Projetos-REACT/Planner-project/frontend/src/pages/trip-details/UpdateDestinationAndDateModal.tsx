import { X, MapPin, Calendar, Upload } from "lucide-react";
import { Button } from "../../components/button";
import { DateRange, DayPicker } from "react-day-picker";
import { useParams } from "react-router-dom";
import { FormEvent, useEffect, useState } from "react";
import { format } from "date-fns";
import { api } from "../../lib/axios";

interface UpdateDestinationAndDateModalProps {
  closeUpdateDestinationAndDateModal: () => void;
  setNewDestination: (destination: string) => void;
  setEventStartAndEndDates: (dates: DateRange | undefined) => void;
  eventStartAndEndDates: DateRange | undefined;
  updateDestinationAndDate: (event: FormEvent<HTMLFormElement>) => void;
}

interface Trip {
    id: string;
    destination: string;
    starts_at: string;
    ends_at: string;
    is_comfirmed: boolean
}

export function UpdateDestinationAndDateModal({
  closeUpdateDestinationAndDateModal,
  eventStartAndEndDates,
  setNewDestination,
  setEventStartAndEndDates,
  updateDestinationAndDate,
}: UpdateDestinationAndDateModalProps) {
  const { tripId } = useParams();

  const [trip, setTrip] = useState<Trip | undefined>()

  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  function openDatePicker() {
    setIsDatePickerOpen(true);
  }

  function closeDatePicker() {
    setIsDatePickerOpen(false);
  }

  const displayeDate =
    eventStartAndEndDates &&
    eventStartAndEndDates.from &&
    eventStartAndEndDates.to
      ? format(eventStartAndEndDates.from, "d ' de ' LLL")
          .concat(" até ")
          .concat(format(eventStartAndEndDates.to, "d ' de ' LLL"))
      : null;

   useEffect(() => {

    api.get(`/trips/${tripId}`).then(res => setTrip(res.data.trip))

   }, [tripId])

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Alterar local/data</h2>
            <button onClick={closeUpdateDestinationAndDateModal}>
              <X className="size-5 text-zinc-400" />
            </button>
          </div>
          <p className="text-sm text-zinc-400">
            Todos os convidados podem ver essas informações
          </p>
        </div>

        <form onSubmit={updateDestinationAndDate} className="space-y-3">
          <div className="h-14 px-5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-8">
            <MapPin className="text-zinc-400 size-5" />
            <input
              type="text"
              name="destination"
              placeholder="Insira o novo endereço"
              className="bg-transparent text-lg placeholder-zinc-400 w-full outline-none"
              onChange={(e) => setNewDestination(e.target.value)}
              defaultValue={trip?.destination || ""}
            />
          </div>
          <button
            onClick={openDatePicker}
            className="h-14 px-5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-8 w-full"
          >
            <Calendar className="text-zinc-400 size-5" />
            <span className="text-lg text-zinc-400 w-full text-left">
            { displayeDate ?  displayeDate :  trip?.starts_at && trip?.ends_at ? `${format(trip.starts_at, "d ' de ' LLL")} até ${format(trip.ends_at, "d ' de ' LLL")}` : "Insira a nova data"}
            </span>
          </button>
          <Button type="submit" variant="primary" size="full">
            Atualizar Viagem <Upload className="size-5 text-zinc-800" />
          </Button>
        </form>

        {isDatePickerOpen && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
            <div className="rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Selecione a Data</h2>
                  <button onClick={closeDatePicker}>
                    <X className="size-5 text-zinc-400" />
                  </button>
                </div>
              </div>
              <DayPicker
                mode="range"
                selected={eventStartAndEndDates}
                onSelect={setEventStartAndEndDates}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

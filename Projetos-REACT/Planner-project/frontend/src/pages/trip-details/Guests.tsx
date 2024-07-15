import { CheckCircle2, CircleDashed, UserCog } from "lucide-react";
import { Button } from "../../components/button";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../lib/axios";

interface Participants {
  id: string;
  name: string | null;
  email: string;
  is_comfirmed: boolean;
}

interface GuestsProps {
  openAddNewInviteModal: () => void
}

export function Guests({openAddNewInviteModal} : GuestsProps) {

  const { tripId } = useParams();
  const [participants, setParticipants] = useState<Participants[]>([]);

  useEffect(() => {
    api
      .get(`/trips/${tripId}/participants`)
      .then((res) => setParticipants(res.data.participants))
      .catch((err) => err);
  }, [tripId]);

  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Convidados</h2>
      <div className="space-y-5">
        {participants && participants.map((participant, i) => (
          <div key={participant.id} className="flex items-center justify-between gap-4">
          <div className="space-y-1.5">
            <span className="block font-medium text-zinc-100">
              {participant.name ?? `Convidado ${i}`}
            </span>
            <span className="block text-sn text-zinc-400 truncate">
              {participant.email}
            </span>
          </div>
          {participant.is_comfirmed ? (
            <CheckCircle2 className="size-5 shrink-0 text-green-400"/>
          ) : (
            <CircleDashed className="text-zinc-400 size-5 shrink-0"/>
          )}
        </div>
        ))}
      </div>
      <Button onClick={openAddNewInviteModal} variant="secondary" size="full">
        <UserCog className="size-5" />
        Gerenciar Convidados
      </Button>
    </div>
  );
}

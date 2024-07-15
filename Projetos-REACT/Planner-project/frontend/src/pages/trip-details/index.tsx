import { Plus } from "lucide-react";
import { FormEvent, useState } from "react";
import { CreateActivityModal } from "./CreateActivityModal";
import { ImportantLinks } from "./ImportantLinks";
import { Guests } from "./Guests";
import { DestinationAndDataHeader } from "./destinationAndDataHeader";
import { Activitys } from "./activitys";
import { AddNewLinkImportantModal } from "./AddNewLinkImportantModal";
import { api } from "../../lib/axios";
import { useParams } from "react-router-dom";
import { AddNewInviteModal } from "./AddNewInvite";
import { UpdateDestinationAndDateModal } from "./UpdateDestinationAndDateModal";
import { DateRange } from "react-day-picker";

export function TripDetailsPage() {
  const { tripId } = useParams();

  const [linkTitle, setLinkTitle] = useState("");
  const [linkUrl, setLinkUrl] = useState("");

  const [newEmailInvite, setNewEmailInvite] = useState("");

  const [newDestination, setNewDestination] = useState("");
  const [eventStartAndEndDates, setEventStartAndEndDates] = useState<
    DateRange | undefined
  >();

  const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] =
    useState(false);

  const [isAddNewLinkImportantModalOpen, setIsAddNewLinkImportantModalOpen] =
    useState(false);

  const [isAddNewInviteModalOpen, setIsAddNewInviteModalOpen] = useState(false);

  const [
    isUpdateDestinationAndDateModalOpen,
    setIsUpdateDestinationAndDateModalOpen,
  ] = useState(false);

  function openUpdateDestinationAndDateModal() {
    setIsUpdateDestinationAndDateModalOpen(true);
  }

  function closeUpdateDestinationAndDateModal() {
    setIsUpdateDestinationAndDateModalOpen(false);
    setEventStartAndEndDates(undefined)
  }

  function openAddNewInviteModal() {
    setIsAddNewInviteModalOpen(true);
  }

  function closeAddNewInviteModal() {
    setIsAddNewInviteModalOpen(false);
  }

  function openAddNewLinkImportantModal() {
    setIsAddNewLinkImportantModalOpen(true);
  }

  function closeAddNewLinkImportantModal() {
    setIsAddNewLinkImportantModalOpen(false);
  }

  function openCreateActivityModal() {
    setIsCreateActivityModalOpen(true);
  }

  function closeCreateActivityModal() {
    setIsCreateActivityModalOpen(false);
  }

  async function createNewLink(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!linkTitle) {
      return;
    }

    if (!linkTitle) {
      return;
    }

    await api.post(`/trips/${tripId}/links`, {
      title: linkTitle,
      url: linkUrl,
    });

    window.document.location.reload();
  }

  async function createNewInvite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    await api.post(`/trips/${tripId}/invites`, {
      email: newEmailInvite,
    });

    window.document.location.reload();
  }

  async function updateDestinationAndDate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    await api.put(`/trips/${tripId}`, {
      destination: newDestination,
      starts_at: eventStartAndEndDates?.from,
      ends_at: eventStartAndEndDates?.to,
    });

    window.document.location.reload()
  }

  return (
    <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
      <DestinationAndDataHeader
        openUpdateDestinationAndDateModal={openUpdateDestinationAndDateModal}
      />
      <main className="flex gap-16 px-4">
        <div className="flex-1 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-semibold">Atividades</h2>
            <button
              onClick={openCreateActivityModal}
              className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400"
            >
              <Plus className="size-5" />
              Cadastrar Atividade
            </button>
          </div>
          <Activitys />
        </div>
        <div className="w-88 space-y-6">
          <ImportantLinks
            openAddNewLinkImportantModal={openAddNewLinkImportantModal}
          />
          <div className="w-full h-px bg-zinc-800" />
          <Guests openAddNewInviteModal={openAddNewInviteModal} />
        </div>
      </main>

      {isCreateActivityModalOpen && (
        <CreateActivityModal
          closeCreateActivityModal={closeCreateActivityModal}
        />
      )}

      {isAddNewLinkImportantModalOpen && (
        <AddNewLinkImportantModal
          closeAddNewLinkImportantModal={closeAddNewLinkImportantModal}
          createNewLink={createNewLink}
          setLinkTitle={setLinkTitle}
          setLinkUrl={setLinkUrl}
        />
      )}

      {isAddNewInviteModalOpen && (
        <AddNewInviteModal
          closeAddNewInviteModal={closeAddNewInviteModal}
          setNewEmailInvite={setNewEmailInvite}
          createNewInvite={createNewInvite}
        />
      )}

      {isUpdateDestinationAndDateModalOpen && (
        <UpdateDestinationAndDateModal
          closeUpdateDestinationAndDateModal={
            closeUpdateDestinationAndDateModal
          }
          eventStartAndEndDates={eventStartAndEndDates}
          setNewDestination={setNewDestination}
          setEventStartAndEndDates={setEventStartAndEndDates}
          updateDestinationAndDate={updateDestinationAndDate}
        />
      )}
    </div>
  );
}

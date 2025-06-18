"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "./card";
import { Button } from "./button";
import { Avatar } from "./avatar";
import { Badge } from "./badge";
import { Users, Plus, Copy } from "lucide-react";
import { cn } from "@/libs/utils";
import { Select } from "./select";
import { ChatMessage, ChatInput } from "./chat-message";

interface Player {
  id: string;
  name: string;
  avatar?: string;
  isHost: boolean;
}

interface LobbyProps {
  roomName: string;
  roomCode: string;
  players: Player[];
  maxPlayers?: number;
  onInvite: (playerIds: string[]) => void;
  onStart: () => void;
  onSettingsChange: (settings: { category: string; quizCount: number }) => void;
}

export const Lobby = ({
  roomName,
  roomCode,
  players,
  maxPlayers = 10,
  onInvite,
  onStart,
  onSettingsChange,
}: LobbyProps) => {
  const [category, setCategory] = useState("tout");
  const [quizCount, setQuizCount] = useState(3);
  const [showInvitePopup, setShowInvitePopup] = useState(false);
  const [selectedInvitees, setSelectedInvitees] = useState<string[]>([]);
  const [chatMessages, setChatMessages] = useState<
    {
      username: string;
      message?: string;
      timestamp: string;
      audioSrc?: string;
    }[]
  >([]);

  const isHost = players.find((p) => p.isHost)?.id === "current-user-id";

  const categoryOptions = [
    { value: "tout", label: "Tout" },
    { value: "bermuda", label: "Bermuda Day" },
    { value: "kalahari", label: "Kalahari" },
    { value: "purgatory", label: "Purgatory" },
  ];

  const friends = [
    { id: "friend1", name: "Charlie" },
    { id: "friend2", name: "Diana" },
    { id: "friend3", name: "Eve" },
  ];

  const handleInvite = () => setShowInvitePopup(true);

  const confirmInvite = () => {
    onInvite(selectedInvitees);
    setSelectedInvitees([]);
    setShowInvitePopup(false);
    alert(`Invitations envoyées à ${selectedInvitees.join(", ")}`);
  };

  const copyRoomCode = () => {
    navigator.clipboard.writeText(roomCode);
    alert("Code copié !");
  };

  const handleSendMessage = (content: string | File) => {
    const timestamp = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    if (typeof content === "string") {
      setChatMessages((prev) => [
        ...prev,
        { username: "Moi", message: content, timestamp },
      ]);
    } else {
      const audioUrl = URL.createObjectURL(content);
      setChatMessages((prev) => [
        ...prev,
        { username: "Moi", timestamp, audioSrc: audioUrl },
      ]);
    }
  };

  const handleSettingsChange = () => {
    onSettingsChange({ category, quizCount });
  };

  const playerSlots = Array.from({ length: maxPlayers }, (_, index) => {
    const player = players[index];
    return player || { id: `empty-${index}`, name: "", isHost: false };
  });

  return (
    <div className="bg-background text-foreground font-sans p-4 flex flex-col md:flex-row gap-4 ">
      {/* Gauche : Paramètres */}
      {isHost && (
        <div className="md:w-1/4 w-full space-y-4">
          <Card className="bg-card rounded-lg shadow-sm">
            <CardContent className="p-4 space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground">
                Paramètres
              </h3>
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">Catégorie</label>
                <Select
                  options={categoryOptions}
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    handleSettingsChange();
                  }}
                  className="w-full bg-muted text-foreground border-border rounded-lg"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">
                  Nombre de quiz
                </label>
                <input
                  type="number"
                  value={quizCount}
                  onChange={(e) => {
                    setQuizCount(Math.max(1, parseInt(e.target.value) || 3));
                    handleSettingsChange();
                  }}
                  className="w-full bg-muted text-foreground border-border rounded-lg p-2"
                  min="1"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Droite : Chat */}
      <div className="md:w-1/4 w-full space-y-4">
        <Card className="bg-card rounded-lg shadow-sm">
          <CardContent className="p-4 space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground">Chat</h3>
            <div className="h-64 overflow-y-auto scrollbar-none border border-border rounded p-2 space-y-2"> {/* Masque complet de la barre */}
              {chatMessages.map((msg, index) => (
                <ChatMessage
                  key={index}
                  username={msg.username}
                  message={msg.message}
                  timestamp={msg.timestamp}
                  audioSrc={msg.audioSrc}
                  isOwnMessage={msg.username === "Moi"}
                  className="text-foreground text-sm"
                />
              ))}
            </div>
            <ChatInput onSend={handleSendMessage} className="mt-2" />
          </CardContent>
        </Card>
      </div>


      {/* Centre : Participants */}
      <div className="md:w-2/4 w-full space-y-4 flex-1">
        <Card className="bg-card rounded-lg shadow-sm">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">ID : {roomCode}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={copyRoomCode}
                  className="text-muted-foreground hover:text-primary"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold uppercase">{roomName}</h2>
                <Badge className="bg-muted text-primary border-primary">
                  <Users className="h-3 w-3 mr-1" /> {players.length}/{maxPlayers}
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {playerSlots.map((player, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex items-center gap-2 p-2 rounded border",
                    player.name ? "border-primary" : "border-muted"
                  )}
                >
                  <span className="text-primary font-bold">{index + 1}</span>
                  {player.name ? (
                    <>
                      <Avatar
                        src={player.avatar}
                        initials={player.name[0]}
                        status={player.isHost ? "online" : "offline"}
                        className="w-8 h-8"
                      />
                      <span className="text-foreground text-sm">
                        {player.name} {player.isHost && "(Host)"}
                      </span>
                    </>
                  ) : (
                    <span className="text-muted-foreground text-sm">-</span>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-4 flex justify-between gap-2">
              <Button
                onClick={handleInvite}
                className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2 uppercase"
              >
                <Plus className="h-4 w-4" /> Inviter
              </Button>
              {isHost && (
                <Button
                  onClick={onStart}
                  className={cn(
                    "bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2 uppercase",
                    players.length < 2 && "opacity-50 cursor-not-allowed"
                  )}
                  disabled={players.length < 2}
                >
                  Démarrer
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      

      {/* Popup d'invitation */}
      {showInvitePopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <Card className="w-80 bg-card text-foreground shadow-lg">
            <CardHeader>
              <h3 className="text-lg font-semibold text-primary uppercase">
                Inviter des amis
              </h3>
            </CardHeader>
            <CardContent className="space-y-2 p-4">
              {friends.map((friend) => (
                <label
                  key={friend.id}
                  className="flex items-center gap-2 text-foreground text-sm"
                >
                  <input
                    type="checkbox"
                    checked={selectedInvitees.includes(friend.id)}
                    onChange={(e) =>
                      setSelectedInvitees((prev) =>
                        e.target.checked
                          ? [...prev, friend.id]
                          : prev.filter((id) => id !== friend.id)
                      )
                    }
                    className="h-4 w-4"
                  />
                  {friend.name}
                </label>
              ))}
            </CardContent>
            <div className="p-4 flex gap-2">
              <Button
                variant="secondary"
                onClick={() => setShowInvitePopup(false)}
                className="bg-muted text-foreground hover:bg-muted/90"
              >
                Annuler
              </Button>
              <Button
                onClick={confirmInvite}
                disabled={!selectedInvitees.length}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Inviter
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

Lobby.displayName = "Lobby";
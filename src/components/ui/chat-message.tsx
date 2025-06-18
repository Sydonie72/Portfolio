"use client";

import { HTMLAttributes, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Avatar } from "./avatar";
import { Button } from "./button";
import { Input } from "./input";
import { Mic, Smile, Send } from "lucide-react";
import { cn } from "@/libs/utils";

interface ChatMessageProps extends HTMLAttributes<HTMLDivElement> {
  username: string;
  message?: string;
  timestamp: string;
  isOwnMessage?: boolean;
  avatarSrc?: string;
  audioSrc?: string; // Pour messages vocaux
}

const ChatMessage = ({
  username,
  message,
  timestamp,
  isOwnMessage = false,
  avatarSrc,
  audioSrc,
  className,
  ...props
}: ChatMessageProps) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const emojis = ["😊", "😂", "👍", "👋", "❤️"];

  return (
    <motion.div
      className={cn(
        "flex items-start gap-3 w-full max-w-[90%] mx-auto",
        isOwnMessage ? "flex-row-reverse" : "",
        className
      )}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300 }}
      {...props}
    >
      <Avatar size="sm" src={avatarSrc} initials={username[0]} />
      <div className={cn("flex-1", isOwnMessage ? "text-right" : "")}>
        <div className="text-sm font-medium text-foreground truncate max-w-[200px] md:max-w-[300px]">
          {username}
        </div>
        {message ? (
          <div className="rounded-md bg-muted p-2 text-sm text-muted-foreground break-words">
            {message}
          </div>
        ) : audioSrc ? (
          <audio
            ref={audioRef}
            controls
            src={audioSrc}
            className="max-w-full"
          />
        ) : null}
        <div className="text-xs text-muted-foreground mt-1">{timestamp}</div>
      </div>
    </motion.div>
  );
};

interface ChatInputProps {
  onSend: (message: string | File) => void;
}

const ChatInput = ({ onSend }: ChatInputProps) => {
  const [text, setText] = useState("");
  const [recording, setRecording] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const emojis = ["😊", "😂", "👍", "👋", "❤️"];

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);
    const chunks: Blob[] = [];
    mediaRecorderRef.current.ondataavailable = (e) => chunks.push(e.data);
    mediaRecorderRef.current.onstop = () => {
      const blob = new Blob(chunks, { type: "audio/webm" });
      onSend(new File([blob], "voice-message.webm"));
      stream.getTracks().forEach((track) => track.stop());
    };
    mediaRecorderRef.current.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setRecording(false);
  };

  const handleSend = () => {
    if (text.trim()) {
      onSend(text);
      setText("");
      setShowEmojiPicker(false);
    }
  };

  return (
    <div className="flex items-center gap-2 p-2 border-t">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
      >
        <Smile className="h-5 w-5" />
      </Button>
      {showEmojiPicker && (
        <div className="absolute bottom-14 left-2 flex gap-1 bg-background border rounded p-2">
          {emojis.map((emoji) => (
            <button
              key={emoji}
              onClick={() => setText((prev) => prev + emoji)}
              className="text-xl"
            >
              {emoji}
            </button>
          ))}
        </div>
      )}
      <Input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Tapez un message..."
        className="flex-1"
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />
      <Button
        variant={recording ? "destructive" : "ghost"}
        size="icon"
        onClick={recording ? stopRecording : startRecording}
      >
        <Mic className="h-5 w-5" />
      </Button>
      <Button variant="default" size="icon" onClick={handleSend}>
        <Send className="h-5 w-5" />
      </Button>
    </div>
  );
};

ChatMessage.displayName = "ChatMessage";
export { ChatMessage, ChatInput };

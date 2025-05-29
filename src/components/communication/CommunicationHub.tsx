import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, Send, Globe, AlertTriangle, Clock, CheckCircle2 } from "lucide-react";

// Mock data for demonstration
const mockMessages = [
  {
    id: "msg1",
    sender: "John Doe",
    senderType: "tenant",
    content: "When will the water heater be fixed? It's been two days without hot water.",
    timestamp: "2025-05-28T14:30:00",
    read: true,
    sentiment: "urgent",
    originalLanguage: "en",
  },
  {
    id: "msg2",
    sender: "Property Manager",
    senderType: "manager",
    content: "The technician is scheduled for tomorrow morning between 9-11 AM. We apologize for the inconvenience.",
    timestamp: "2025-05-28T15:45:00",
    read: true,
    sentiment: "neutral",
    originalLanguage: "en",
  },
  {
    id: "msg3",
    sender: "Maria Garcia",
    senderType: "tenant",
    content: "¿Puedo pagar el alquiler en efectivo este mes? Tuve un problema con mi cuenta bancaria.",
    timestamp: "2025-05-29T09:15:00",
    read: false,
    sentiment: "neutral",
    originalLanguage: "es",
    translation: "Can I pay the rent in cash this month? I had an issue with my bank account."
  },
];

const languages = [
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "sw", name: "Swahili" },
  { code: "zh", name: "Chinese" },
];

const CommunicationHub = () => {
  const [activeTab, setActiveTab] = useState("messages");
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [messageText, setMessageText] = useState("");
  const [showTranslation, setShowTranslation] = useState(true);

  const getSentimentBadge = (sentiment: string) => {
    switch (sentiment) {
      case "urgent":
        return <Badge variant="destructive" className="ml-2"><AlertTriangle className="h-3 w-3 mr-1" /> Urgent</Badge>;
      case "positive":
        return <Badge variant="success" className="ml-2"><CheckCircle2 className="h-3 w-3 mr-1" /> Positive</Badge>;
      default:
        return null;
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const handleSendMessage = () => {
    if (messageText.trim()) {
      // Here you would normally send the message to your backend
      console.log("Sending message:", messageText);
      setMessageText("");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Communication Hub</h1>
        <p className="text-muted-foreground">Manage all your communications in one place.</p>
      </div>

      <Tabs defaultValue="messages" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="announcements">Announcements</TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center gap-2">
            <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    {lang.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button variant="outline" size="sm" onClick={() => setShowTranslation(!showTranslation)}>
              <Globe className="h-4 w-4 mr-2" />
              {showTranslation ? "Hide" : "Show"} Translations
            </Button>
          </div>
        </div>

        <TabsContent value="messages" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Conversations</CardTitle>
                <CardDescription>Recent message threads</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[500px]">
                  <div className="space-y-2">
                    {["John Doe", "Maria Garcia", "Ahmed Hassan", "Sarah Johnson"].map((name, i) => (
                      <div 
                        key={i} 
                        className={`flex items-center gap-3 p-3 rounded-md hover:bg-accent cursor-pointer ${i === 0 ? "bg-accent" : ""}`}
                      >
                        <Avatar>
                          <AvatarFallback>{getInitials(name)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-center">
                            <p className="font-medium truncate">{name}</p>
                            <span className="text-xs text-muted-foreground">
                              {i === 0 ? "2h ago" : i === 1 ? "Today" : "Yesterday"}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground truncate">
                            {i === 0 ? "The technician is scheduled..." : 
                             i === 1 ? "¿Puedo pagar el alquiler..." : 
                             "Thanks for your help with..."}
                          </p>
                        </div>
                        {i === 1 && <Badge className="shrink-0">New</Badge>}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  New Message
                </Button>
              </CardFooter>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>John Doe</CardTitle>
                    <CardDescription>Unit 3B, Kilimani Residences</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px] pr-4">
                  <div className="space-y-4">
                    {mockMessages.map((message) => (
                      <div key={message.id} className="flex flex-col gap-2">
                        <div className={`flex items-start gap-3 ${message.senderType === "manager" ? "flex-row-reverse" : ""}`}>
                          <Avatar className="mt-1">
                            <AvatarFallback>{getInitials(message.sender)}</AvatarFallback>
                          </Avatar>
                          <div className={`max-w-[80%] ${message.senderType === "manager" ? "bg-primary text-primary-foreground" : "bg-muted"} p-3 rounded-lg`}>
                            <div className="flex justify-between items-center mb-1">
                              <span className="font-medium">{message.sender}</span>
                              <span className="text-xs opacity-70">
                                {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </div>
                            <p>{message.content}</p>
                            {message.originalLanguage !== selectedLanguage && message.translation && showTranslation && (
                              <div className="mt-2 pt-2 border-t border-dashed border-opacity-20 text-sm italic">
                                <Globe className="h-3 w-3 inline-block mr-1 opacity-70" />
                                <span>{message.translation}</span>
                              </div>
                            )}
                          </div>
                          {getSentimentBadge(message.sentiment)}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
              <CardFooter>
                <div className="flex w-full items-center gap-2">
                  <Textarea 
                    placeholder="Type your message..." 
                    className="min-h-[80px]"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                  />
                  <Button size="icon" onClick={handleSendMessage}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="announcements" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Building Announcements</CardTitle>
              <CardDescription>Create and manage announcements for your properties</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center py-12">Announcement management interface coming soon</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="community" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Community Portal</CardTitle>
              <CardDescription>Engage with your community</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center py-12">Community features coming soon</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CommunicationHub;

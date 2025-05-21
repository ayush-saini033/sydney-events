import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertCircle,
  Calendar,
  MapPin,
  Link as LinkIcon,
  Tag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { RegisterEmail } from "@/server/register-email";
import { toast } from "sonner";


interface eventI {
  address: string;
  description: string;
  endDate: string;
  heading: string;
  image: string;
  link: string;
  price: string | null;
  startDate: string;
}

export default function EventSignupDialog({
  event,
  showTicketDialog,
  setShowTicketDialog,
}: {
  showTicketDialog: boolean;
  setShowTicketDialog: (show: boolean) => void;
  event: eventI;
}) {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const validateEmail = (email: string) => {
    return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const handleSubmit = async () => {
    if (validateEmail(email)) {

      const response = await RegisterEmail(email);

      if(response.success){
        localStorage.setItem("event-registered-email", email); 
        toast.success(response.message)
        setIsSubmitted(true);
        window.open(event.link, "_blank");

      }else{
        toast.error(response.message)
      }
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  // Format dates for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="flex items-center justify-center">
      <Dialog
        open={showTicketDialog}
        onOpenChange={(open) => setShowTicketDialog(open)}
      >
        <DialogContent className="bg-gradient-to-br from-blue-100 to-pink-100 border-2 border-pink-300 shadow-lg rounded-lg max-w-md sm:max-w-lg">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <div className="h-2 w-16 bg-blue-400 rounded-full"></div>
              <div className="h-2 w-8 bg-pink-400 rounded-full"></div>
              <div className="h-2 w-12 bg-blue-400 rounded-full"></div>
            </div>
            <DialogTitle className="text-2xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-pink-600 pt-4">
              {isSubmitted ? "Registration Confirmed!" : event.heading}
            </DialogTitle>
            <div className="flex items-center justify-between mb-4">
              <div className="h-2 w-8 bg-pink-400 rounded-full"></div>
              <div className="h-2 w-16 bg-blue-400 rounded-full"></div>
              <div className="h-2 w-12 bg-pink-400 rounded-full"></div>
            </div>
            <DialogDescription className="text-center text-gray-700">
              {isSubmitted
                ? "You've successfully registered for this event! Check your email for details."
                : "Register now to secure your spot at this exclusive event!"}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            {/* Event Image */}
            <div className="rounded-md overflow-hidden shadow-md">
              <Image
                width={800}
                height={400}
                src={event.image}
                alt={event.heading}
                className="w-full h-48 object-cover"
              />
            </div>

            {/* Event Details */}
            <div className="bg-white bg-opacity-70 rounded-md p-4 space-y-3">
              <p className="text-gray-700">{event.description}</p>

              <div className="flex items-start space-x-2">
                <Calendar className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    Start: {formatDate(event.startDate)}
                  </p>
                  <p className="text-sm font-medium text-gray-700">
                    End: {formatDate(event.endDate)}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <MapPin className="h-5 w-5 text-pink-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-700">{event.address}</p>
              </div>

              {event.price && (
                <div className="flex items-center space-x-2">
                  <Tag className="h-5 w-5 text-blue-500" />
                  <p className="text-sm font-medium text-gray-700">
                    Price: {event.price}
                  </p>
                </div>
              )}

              <div className="flex items-center space-x-2">
                <LinkIcon className="h-5 w-5 text-pink-500" />
                <a
                  href={event.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline"
                >
                  More Information
                </a>
              </div>
            </div>

            {/* Email Registration Form */}
            <div className="space-y-2">
              <div className="relative">
                <Input
                  className={`bg-white border-2 ${
                    isValid
                      ? "border-blue-300 focus:border-pink-400"
                      : "border-red-400"
                  } rounded-md pl-4 pr-10 py-2 w-full focus:outline-none`}
                  placeholder="Enter your email to register"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setIsValid(true);
                  }}
                />
                {!isValid && (
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-red-500">
                    <AlertCircle size={18} />
                  </div>
                )}
              </div>
              {!isValid && (
                <p className="text-sm text-red-500">
                  Please enter a valid email address
                </p>
              )}
            </div>

            <DialogFooter className="sm:justify-center">
              <Button
                className="w-full bg-gradient-to-r from-blue-500 to-pink-500 hover:from-blue-600 hover:to-pink-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-300"
                onClick={handleSubmit}
              >
                Register Now
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

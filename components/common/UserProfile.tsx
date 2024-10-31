'use client';

import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { IUser } from '@/types/entities';
import { CardFooter } from "@/components/ui/card";
import { Pencil, Check, X } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function Component({ user }: { user: IUser; }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<IUser>(user);  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
  };

  const handleGenderChange = (value: string) => {
    setEditedUser({ ...editedUser, gender: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Updated user:', editedUser);
    setIsEditing(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
          <Avatar className="w-24 h-24">
            <AvatarImage src={user.image} alt={user.name} />
            <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-2">
            <div>
              <Label htmlFor="username" className="text-sm font-medium">Username</Label>
              <Input id="username" value={user.username} disabled className="bg-muted" />
            </div>
            <div>
              <Label htmlFor="email" className="text-sm font-medium">Email</Label>
              <Input id="email" value={user.email} disabled className="bg-muted" />
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="name" className="text-sm font-medium">Name</Label>
            <Input
              id="name"
              name="name"
              value={editedUser.name}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={isEditing ? "border-primary" : ""}
            />
          </div>
          <div>
            <Label htmlFor="age" className="text-sm font-medium">Age</Label>
            <Input
              id="age"
              name="age"
              value={editedUser.age}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={isEditing ? "border-primary" : ""}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="gender" className="text-sm font-medium">Gender</Label>
          <Select
            disabled={!isEditing}
            value={editedUser.gender}
            onValueChange={handleGenderChange}
          >
            <SelectTrigger className={isEditing ? "border-primary" : ""}>
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="bio" className="text-sm font-medium">Bio</Label>
          <Textarea
            id="bio"
            name="bio"
            value={editedUser.bio}
            onChange={handleInputChange}
            disabled={!isEditing}
            className={`h-24 ${isEditing ? "border-primary" : ""}`}
          />
        </div>
      </form>
      <CardFooter className="flex justify-end space-x-2 mt-2">
        {isEditing ? (
          <>
            <Button onClick={handleSubmit} className="bg-green-500 hover:bg-green-600 e">
              <Check className="w-4 h-4 mr-2" />
              Save
            </Button>
            <Button onClick={() => setIsEditing(false)} variant="outline" className="border-red-500 text-red-500 ">
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
          </>
        ) : (
          <Button onClick={() => setIsEditing(true)} className="bg-blue-500 hover:bg-blue-600 text-white">
            <Pencil className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
        )}
      </CardFooter>

    </>
  );
}
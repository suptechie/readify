'use client';

import { useState } from "react";
import { memo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Genres, IArticle } from "@/types/entities";

const AddArticleForm = ({ onAddArticle }: { onAddArticle: (article: IArticle) => void; }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [genre, setGenre] = useState<string>(Genres.TECHNOLOGY);
    const [tags, setTags] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAddArticle({});

    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <Label htmlFor="title">Title</Label>
                <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>
            <div>
                <Label htmlFor="content">Content</Label>
                <Textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} required />
            </div>
            <div>
                <Label htmlFor="genre">Genre</Label>
                <Select value={genre} onValueChange={setGenre} required>
                    <SelectTrigger id="genre">
                        <SelectValue placeholder="Select a genre" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Technology">Technology</SelectItem>
                        <SelectItem value="Science">Science</SelectItem>
                        <SelectItem value="Business">Business</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div>
                <Label htmlFor="tags">Tags (comma-separated)</Label>
                <Input id="tags" value={tags} onChange={(e) => setTags(e.target.value)} />
            </div>
            <Button type="submit">Add Article</Button>
        </form>
    );
};


export default memo(AddArticleForm);
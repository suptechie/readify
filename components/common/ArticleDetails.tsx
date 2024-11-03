'use client';

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Share2, Calendar } from "lucide-react";
import Image from "next/image";
import { toast } from '@/hooks/use-toast';
import LikeButton from '../button/LikeButton';
import { memo, useEffect, useState } from "react";
import DateFormatter from "./DateFormatter";
import { ArticleCardProps } from "@/types/props";
import ArticleActions from "../button/ArticleActions";

const ArticleDetail = ({ article, userId }: ArticleCardProps) => {
  const [isAuthor, setIsAuthor] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied!",
      description: "The article link has been copied to your clipboard.",
    });
  };

  useEffect(() => {
    if (article.author === userId) {
      setIsAuthor(true);
    }
  }, [article, userId]);

  return (
    <article className="container mx-auto max-w-4xl">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4 text-foreground">{article.title}</h1>
        <div className="flex items-center gap-4 mb-4">
          <Avatar className="w-10 h-10">
            <AvatarImage src={article.authorImage} alt={article.authorUsername} />
            <AvatarFallback>{article.authorUsername?.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-foreground">{article.authorUsername}</p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <Badge variant="secondary" className="px-1 py-1">{article.genre}</Badge>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                <DateFormatter dateString={article.createdAt!.toString()} />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {article.tags!.map((tag) => (
            <Badge key={tag} variant="outline" className="px-2 py-1">
              {tag}
            </Badge>
          ))}
        </div>
      </header>

      <div className="relative aspect-video w-full mb-8 rounded-lg overflow-hidden shadow-lg">
        <Image
          src={article.image!}
          alt={article.title!}
          layout="fill"
          objectFit="cover"
          priority
          className="transition-transform duration-300 hover:scale-105"
        />
      </div>

      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <LikeButton id={article._id!} likesCount={article.likeCount} userIds={article.userIds} userId={userId} />
          <Button
            variant="outline"
            size="sm"
            onClick={handleShare}
            className="flex items-center space-x-2"
          >
            <Share2 className="h-4 w-4" />
            <span>Share</span>
          </Button>
          {isAuthor && (
            <ArticleActions article={article} />
          )}
        </div>
      </div>

      <Separator className="mb-8" />

      <div className="prose prose-lg max-w-none dark:prose-invert">
        {article.content!.split('\n').map((paragraph, index) => (
          <p key={index} className="mb-4">
            {paragraph}
          </p>
        ))}
      </div>

      <Separator className="my-8" />

      <footer className="text-sm text-muted-foreground">
        <p>Last updated on <DateFormatter dateString={article.updatedAt!.toString()} /></p>
      </footer>
    </article>
  );
};

export default memo(ArticleDetail);
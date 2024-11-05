'use client';

import { memo, useCallback } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Link from "next/link";
import Image from "next/image";
import { MoreVertical, Flag, Copy } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import LikeButton from "../button/LikeButton";
import { ArticleCardProps } from "@/types/props";
import ShareButton from "../button/ShareButton";
import { NEXT_PUBLIC_API_URL } from "@/config";

const ArticleCard = ({ article, userId }: ArticleCardProps) => {

  const handleReport = useCallback(() => {
    toast({
      title: "Article reported",
      description: "Thank you for your feedback. We'll review this article.",
    });
  },[]);

  const displayedTags = article.tags!.slice(0, 1);
  const remainingTagsCount = article.tags!.length - 1;

  return (
    <Card className="w-full overflow-hidden transition-shadow duration-300 hover:shadow-lg">
      <Link href={`/articles/${article._id}`}>
        <CardHeader className="p-0">
          <div className="relative h-48 w-full">
            <Image
              src={article.image!}
              alt={article.title!}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 hover:scale-105"
            />
          </div>
        </CardHeader>
        <CardContent className="p-4 flex flex-col gap-3">
          <CardTitle className="line-clamp-1 hover:underline">
            {article.title}
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground line-clamp-2">
            {article.content}
          </CardDescription>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="font-medium">
              {article.genre}
            </Badge>
            {displayedTags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
            {remainingTagsCount > 0 && (
              <Badge variant="outline">+{remainingTagsCount}</Badge>
            )}
          </div>
        </CardContent>
      </Link>
      <CardFooter className="flex justify-between items-center p-4 border-t">
        <div className="flex items-center space-x-2">
          <LikeButton likesCount={article.likeCount} id={article._id!} userIds={article.userIds} userId={userId} />
          <ShareButton id={article._id!} />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              aria-label="More options"
              className="hover:bg-primary/10"
            >
              <MoreVertical className="h-5 w-5 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(`${NEXT_PUBLIC_API_URL}/articles/${article._id}`)}
              className="cursor-pointer"
            >
              <Copy className="mr-2 h-4 w-4" />
              <span>Copy link</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleReport} className="cursor-pointer">
              <Flag className="mr-2 h-4 w-4" />
              <span>Report</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardFooter>
    </Card>
  );
};

export default memo(ArticleCard);
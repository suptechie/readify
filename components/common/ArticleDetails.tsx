'use client'

import { useState } from 'react'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Heart, Share2 } from "lucide-react"
import Image from "next/image"
import { toast } from '@/hooks/use-toast';
import { IArticle } from '@/types/entities';


export default function ArticleDetail({ article }: { article: IArticle }) {
  const [likes, setLikes] = useState(article.likes!)
  const [isLiked, setIsLiked] = useState(false)

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1)
    } else {
      setLikes(likes + 1)
    }
    setIsLiked(!isLiked)
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    toast({
      title: "Link copied!",
      description: "The article link has been copied to your clipboard.",
    })
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Card className="overflow-hidden">
        <CardHeader className="p-0">
          <div className="relative h-[400px] w-full">
            <Image 
              src={article.image!} 
              alt={article.title!} 
              layout="fill" 
              objectFit="cover" 
              priority
            />
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="space-y-2">
            <CardTitle className="text-3xl font-bold">{article.title}</CardTitle>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <Badge variant="secondary">{article.genre}</Badge>
              <span>Published on {article.createdAt}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleLike}
                className={`flex items-center space-x-2 ${isLiked ? 'text-primary' : ''}`}
              >
                <Heart className={`h-5 w-5 ${isLiked ? 'fill-primary' : ''}`} />
                <span>{likes}</span>
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleShare}
                className="flex items-center space-x-2"
              >
                <Share2 className="h-5 w-5" />
                <span>Share</span>
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {article.tags!.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <Separator />

          <div className="prose prose-lg max-w-none">
            {article.content!.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </CardContent>
        <CardFooter className="p-6 border-t">
          <p className="text-sm text-muted-foreground">
            Last updated on {article.updatedAt}
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
import type { Story } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Card } from "../ui/card";

type StoriesProps = {
  stories: Story[];
};

export function Stories({ stories }: StoriesProps) {
  return (
    <div className="py-4">
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex w-max space-x-4 px-4 sm:px-0">
          {stories.map((story) => (
            <div
              key={story.id}
              className="flex cursor-pointer flex-col items-center gap-2 text-center w-20 group"
            >
              <Avatar className="h-16 w-16 border-2 border-accent p-0.5 group-hover:scale-105 group-hover:border-primary transition-all duration-300">
                <AvatarImage src={story.imageUrl} alt={story.creator.name} data-ai-hint="food" />
                <AvatarFallback>
                  {story.creator.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <p className="text-xs font-medium truncate w-full text-muted-foreground group-hover:text-foreground transition-colors">
                {story.creator.name}
              </p>
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="h-0" />
      </ScrollArea>
    </div>
  );
}

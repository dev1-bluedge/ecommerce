import {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from "@/components/ui/timeline";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"], weight: "700" });

const items = [
  {
    id: 1,
    date: "1 day ago",
    title: "Ayesha Khan",
    action: "left a review",
    description:
      "I came across their product review on Instagram and decided to place an order. The delivery was fast and the skincare products were exactly as shown. Super happy with the quality!",
    image: "/pexel4.jpg",
  },
  {
    id: 2,
    date: "1 week ago",
    title: "Huma Waleed",
    action: "left a review",
    description:
      "Saw Ayesha’s review on Instagram and placed my first order. The foundation matched my skin perfectly, and the packaging was really nice. Definitely ordering again!",
    image: "/pexel2.jpg",
  },
  {
    id: 3,
    date: "3 weeks ago",
    title: "Fatima Noor",
    action: "left a review",
    description:
      "After watching a few reviews on YouTube, I gave their online store a try. The products are high-quality and my skin is loving them. Customer support was responsive too!",
    image: "/pexel3.jpg",
  },
  {
    id: 4,
    date: "2 years ago",
    title: "Rafia Malik",
    action: "left a review",
    description:
      "I watched a detailed product review online before ordering, and I’m glad I did. Everything came exactly as advertised. Great service and authentic products!",
    image: "/pexel1.jpg",
  },
];



export default function Line() {

  return (
    <div className="py-10 flex flex-col bg-white justify-center items-center gap-10 ">
    <h1 className={`${playfair.className} text-4xl font-bold text-[#D4AF37]`}>Our reviews</h1>
      <Timeline className={"w-[90%] sm:w-[70%] lg:w-[80%] "}>
        {items.map((item) => (
          <TimelineItem
            key={item.id}
            step={item.id}
            className="group-data-[orientation=vertical]/timeline:ms-10 group-data-[orientation=vertical]/timeline:not-last:pb-8"
          >
            <TimelineHeader>
              <TimelineSeparator className="group-data-[orientation=vertical]/timeline:-left-7 group-data-[orientation=vertical]/timeline:h-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=vertical]/timeline:translate-y-6.5" />
              <TimelineTitle className="mt-0.5">
                {item.title}{" "}
                <span className="text-muted-foreground text-sm font-normal">
                  {item.action}
                </span>
              </TimelineTitle>
              <TimelineIndicator className="bg-primary/10 group-data-completed/timeline-item:bg-primary group-data-completed/timeline-item:text-primary-foreground flex size-6 items-center justify-center border-none group-data-[orientation=vertical]/timeline:-left-7">
                <img
                  src={item.image}
                  alt={item.title}
                  className="size-6 rounded-full"
                />
              </TimelineIndicator>
            </TimelineHeader>
            <TimelineContent className="text-foreground mt-2 rounded-lg border px-4 py-3 ">
              {item.description}
              <TimelineDate className="mt-1 mb-0">{item.date}</TimelineDate>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </div>
  );
}

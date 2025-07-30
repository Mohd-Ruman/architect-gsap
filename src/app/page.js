'use client';
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {

  const images = [
    {
      title: 'Capsule',
      image: '/cap1.png'
    },
    {
      title: 'Cuboid',
      image: '/cap2.png'
    },
    {
      title: 'Desert Capsule',
      image: '/cap3.png'
    },
  ]

  useGSAP(() => {
    const cards = gsap.utils.toArray(".card");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".cards",
        start: "center center",
        end: "+=3000",
        scrub: 2,
        pin: true,
      },
    });

    // STEP 1: First card expands from scale 0.5 to 1
    tl.fromTo(cards[0],
      {
        scale: 0.4,
        opacity: 0.8,
        borderRadius: '300px'
      },
      {
        scale: 1,
        y: 0,
        opacity: 1,
        duration: 1.5,
        borderRadius: '44px'
      },
    );

    tl.from(cards[0].querySelector('h1'), {
      y: 50,
      opacity: 0, 
      duration: 2
    })
    

    cards.forEach((card, index) => {

      //Exclude the first card
      if (index === 0) return;

      tl.from(card, {
        y: "100vh",
        duration: 1,
        borderRadius: '44px'
      }); 

      // Animate previous card (if exists) out at the same time
      if (index > 0) {
        const prevCard = cards[index - 1];
        tl.to(prevCard, {
          opacity: 0,
          scale: 0.9,
          duration: 1
        }, '<'); // '<' = start at same time as previous .from
      }

      // Fade in title for cards
      tl.from(card.querySelector('h1'), {
        y: 50,
        opacity: 0, 
        duration: 1
      })
    

      
    });
  }, []);

  return (
    <>
      <section className="w-screen h-dvh flex items-center justify-center">
        <h1>We don't only create Architecture.</h1>
      </section>

      <section className="cards relative h-screen w-full">
        {
          images.map((image, index) => (
            <div
              className="card absolute top-0 left-0 w-full h-full flex items-center justify-center overflow-hidden rounded-[44px]"
              key={index}
            >
              <img
                src={image.image}
                className="w-full h-full object-cover rounded-[inherit]"
        
                alt={`Card ${index}`}
              />
              <h1
                className="absolute"
              >{image.title}</h1>
            </div>
          ))
        }
      </section>

      <section className="w-screen h-dvh flex items-center justify-center">
        <h1>We define the way to architect.</h1>
      </section>
    </>
  );
}

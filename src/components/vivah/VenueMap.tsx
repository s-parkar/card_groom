
'use client';
import { MapPin } from 'lucide-react';
import Image from 'next/image';

const googleMapsUrl = `https://www.google.com/maps/place/Samada+Hotel,+1%2F68,+Ruchi+Khand+2,+Sharda+Nagar,+Yojna,+Lucknow,+Uttar+Pradesh+226002/data=!4m2!3m1!1s0x399bfb1131ee21c3:0xa22b506eccf802e0?utm_source=mstt_1&entry=gps&coh=192189&g_ep=CAESBzI1LjQxLjYYACCenQoqmQEsOTQyNjc3MjcsOTQyNzU0MDcsOTQyOTIxOTUsOTQyMjMyOTksOTQyMTY0MTMsOTQyODA1NzYsOTQyMTI0OTYsOTQyMDczOTQsOTQyMDc1MDYsOTQyMDg1MDYsOTQyMTc1MjMsOTQyMTg2NTMsOTQyMjk4MzksOTQyNzUxNjgsOTQyNzk2MTksNDcwODQzOTMsOTQyMTMyMDBCAklO&skid=0639d725-7716-4d4f-9a5b-74ac4af8f894&g_st=aw`;

export default function VenueMap() {
  return (
    <section id="venue" className="animate-fade-in-scroll">
      <div className="text-center">
        <h2 className="font-headline text-7xl sm:text-8xl text-center mb-8 text-primary text-shadow-gold">
          Venue
        </h2>
        <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="block max-w-3xl mx-auto rounded-lg overflow-hidden shadow-lg border-4 border-primary/20 cursor-pointer group">
          <Image
              src="/map.png?v=2"
              alt="Map to Hotel Samada"
              width={600}
              height={400}
              className="w-full h-auto object-cover"
          />
        </a>
        <div className="mt-6">
          <h3 className="text-2xl font-bold">Hotel Samada</h3>
          <p className="text-muted-foreground">Ruchi Khand 2, Sharda Nagar Yojna, Lucknow, Uttar Pradesh</p>
          <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-4 text-primary hover:underline">
            <MapPin className="w-4 h-4" />
            Get Directions
          </a>
        </div>
      </div>
    </section>
  );
}

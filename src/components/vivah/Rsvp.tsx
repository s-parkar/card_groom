
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import type { RsvpData } from '@/lib/schema';

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxhq7ypiDMMZKPnWvE96N4Lr8FBpXlTkiQB_J6BueqD6Wl3CQjUOhcivEN6ryTSBV5j3g/exec';


type RsvpFormProps = {
  addBlessing: (message: string) => void;
};

type FormState = Omit<RsvpData, 'attending'> & {
    attending: 'yes' | 'no' | '';
};

export default function Rsvp({ addBlessing }: RsvpFormProps) {
  const { toast } = useToast();
  const [formState, setFormState] = useState<FormState>({
    name: '',
    attending: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };
  
  const handleAttendingChange = (value: 'yes' | 'no') => {
    setFormState(prev => ({ ...prev, attending: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (SCRIPT_URL === 'xyz') {
        toast({
            variant: 'destructive',
            title: 'Configuration Needed',
            description: 'The application is not yet configured to receive RSVPs. Please complete the setup steps.',
        });
        return;
    }

    if (!formState.name || !formState.attending) {
      toast({
        variant: 'destructive',
        title: 'Oops!',
        description: 'Please fill out your name and select if you will be attending.',
      });
      return;
    }
    
    setIsSubmitting(true);

    const dataToSubmit = {
        ...formState,
        attending: formState.attending === 'yes' ? 'Joyfully Accept' : 'Regretfully Decline',
        timestamp: new Date().toISOString(),
    };

    try {
        const response = await fetch(SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors', // Important for cross-origin requests to Apps Script
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSubmit),
        });

        if (formState.message) {
          addBlessing(formState.message);
        }
        toast({
          title: 'Thank You!',
          description: 'Your response has been graciously received.',
        });
        setFormState({ name: '', attending: '', message: '' });

    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'Could not save your RSVP. Please try again later.',
      });
    } finally {
        setIsSubmitting(false);
    }
  };


  return (
    <section id="rsvp" className="animate-fade-in-scroll">
      <div className="max-w-2xl mx-auto">
        <div className="text-center">
            <h2 className="font-headline text-7xl sm:text-8xl mb-4 text-primary text-shadow-gold">RSVP</h2>
            <p className="px-4 text-base text-muted-foreground">
                Your presence is the greatest gift, but a response by November 15th would be deeply appreciated.
                <br /> For queries, contact: +91 9450880247 , 9990054390 
          </p>
        </div>
        <form onSubmit={handleSubmit} className="mt-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-lg">Full Name</Label>
              <Input id="name" name="name" placeholder="Your esteemed name" required value={formState.name} onChange={handleInputChange} disabled={isSubmitting} />
            </div>
            <div className="space-y-3">
              <Label className="text-lg">Will you grace us with your presence?</Label>
              <RadioGroup name="attending" className="flex flex-col sm:flex-row gap-4 pt-2" onValueChange={handleAttendingChange} value={formState.attending}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="yes" disabled={isSubmitting} />
                  <Label htmlFor="yes" className="text-base">Joyfully Accept</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="no" disabled={isSubmitting} />
                  <Label htmlFor="no" className="text-base">Regretfully Decline</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="space-y-2">
              <Label htmlFor="message" className="text-lg">Your Blessings & Wishes</Label>
              <Textarea id="message" name="message" placeholder="Share your words of wisdom and joy..." value={formState.message} onChange={handleInputChange} disabled={isSubmitting}/>
            </div>
          </div>
          <div className="pt-6">
             <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-6" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Send Response'}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}

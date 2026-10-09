import React, { useState } from 'react';
import { CustomCakeInquiry } from '../types';
import { ResilientImage } from './ResilientImage';
import { CheckCircle2, Upload, Sparkles, Calendar, Users, CakeSlice } from 'lucide-react';

export const CustomCakeView: React.FC = () => {
  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneOrWhatsapp, setPhoneOrWhatsapp] = useState('');
  const [occasion, setOccasion] = useState('Birthday Celebration');
  const [desiredDate, setDesiredDate] = useState('');
  const [servings, setServings] = useState('15–20 Guests (Single or Two-Tier)');
  const [preferredFlavor, setPreferredFlavor] = useState('Madagascar Vanilla Bean & Raspberry Preserve');
  const [designDescription, setDesignDescription] = useState('');
  const [budgetRange, setBudgetRange] = useState('');
  const [inspirationImageName, setInspirationImageName] = useState('');
  const [inspirationImagePreview, setInspirationImagePreview] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [submittedInquiry, setSubmittedInquiry] = useState<CustomCakeInquiry | null>(null);

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 3);
  const minDateStr = tomorrow.toISOString().split('T')[0];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setInspirationImageName(file.name);
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setInspirationImagePreview(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (
      !customerName.trim() ||
      !email.trim() ||
      !phoneOrWhatsapp.trim() ||
      !desiredDate ||
      !designDescription.trim()
    ) {
      setErrorMsg(
        'Please complete your name, email, telephone/WhatsApp number, event date, and cake design description.'
      );
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/custom-cakes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName,
          email,
          phoneOrWhatsapp,
          occasion,
          desiredDate,
          servings,
          preferredFlavor,
          designDescription,
          budgetRange,
          inspirationImageName,
          inspirationImagePreview,
          additionalNotes,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Could not submit custom cake inquiry.');
      }

      setSubmittedInquiry(data.inquiry);
    } catch (err: any) {
      setErrorMsg(err.message || 'An error occurred while sending your inquiry.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="py-12 md:py-20 bg-[#F8F4EC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Editorial Presentation & Visual Reference */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#9A6A43] font-medium">
              <Sparkles className="w-3.5 h-3.5 text-[#B69A68]" />
              <span>Bespoke Celebration Cakes</span>
            </div>

            <h1
              className="font-serif-display text-4xl md:text-5xl font-semibold text-[#352820] leading-tight"
              style={{ textWrap: 'balance' }}
            >
              Your Celebration, Made Sweeter.
            </h1>

            <p className="text-base text-[#352820]/80 leading-relaxed">
              Make your special moments memorable with a cake designed around your celebration. Each
              custom creation at Bite of Savour is crafted to order for weddings, engagements,
              birthdays, and intimate gatherings.
            </p>

            <div className="rounded-lg overflow-hidden border border-[#352820]/10 shadow-xs bg-[#EFE6D8]">
              <ResilientImage
                src="/images/product_custom_celebration_cake_1791574516943.jpg"
                alt="Bespoke two-tier celebration cake by Bite of Savour"
                fallbackTitle="Bespoke Celebration Cakes"
                aspectClassName="aspect-[4/3]"
              />
            </div>

            <div className="bg-[#FFFCF7] border border-[#352820]/10 rounded-lg p-6 space-y-4 text-xs text-[#352820]/80">
              <h2 className="font-serif-display text-xl font-semibold text-[#352820]">
                How Our Custom Inquiry Process Works
              </h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Calendar className="w-4 h-4 text-[#9A6A43] shrink-0 mt-0.5" />
                  <p>
                    <strong className="text-[#352820]">1. Share Your Event Date:</strong> Submit your
                    preferred date, guest count, and flavour preferences using the inquiry form.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CakeSlice className="w-4 h-4 text-[#9A6A43] shrink-0 mt-0.5" />
                  <p>
                    <strong className="text-[#352820]">2. Design &amp; Flavour Consultation:</strong>{' '}
                    Our pastry team reviews our baking schedule and replies with availability and a
                    tailored quote.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="w-4 h-4 text-[#9A6A43] shrink-0 mt-0.5" />
                  <p>
                    <strong className="text-[#352820]">3. Please Note:</strong> Submitting an
                    inquiry request does not automatically confirm an order until our bakery team
                    reviews and confirms availability.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Validated Custom Cake Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#FFFCF7] border border-[#352820]/10 rounded-lg p-6 sm:p-8 md:p-10 shadow-xs">
              {submittedInquiry ? (
                <div className="py-8 text-center space-y-5">
                  <div className="w-14 h-14 rounded-full bg-[#EFE6D8] text-[#9A6A43] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <p className="text-xs uppercase tracking-widest text-[#9A6A43] font-medium">
                    Inquiry Reference #{submittedInquiry.inquiryNumber}
                  </p>
                  <h2 className="font-serif-display text-3xl font-semibold text-[#352820]">
                    Thank You, {submittedInquiry.customerName}
                  </h2>
                  <p className="text-sm text-[#352820]/80 max-w-lg mx-auto leading-relaxed">
                    Your custom cake inquiry for <strong>{submittedInquiry.occasion}</strong> on{' '}
                    <strong>{submittedInquiry.desiredDate}</strong> has been received by Bite of
                    Savour.
                  </p>
                  <div className="p-4 bg-[#F8F4EC] border border-[#352820]/10 rounded text-xs text-left max-w-md mx-auto space-y-1.5 text-[#352820]/80">
                    <div>
                      <strong>Approximate Servings:</strong> {submittedInquiry.servings}
                    </div>
                    <div>
                      <strong>Preferred Flavour:</strong> {submittedInquiry.preferredFlavor}
                    </div>
                    <div>
                      <strong>Status:</strong>{' '}
                      <span className="text-[#9A6A43] font-medium">
                        Awaiting Bakery Availability Review
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-[#352820]/65 max-w-md mx-auto leading-relaxed">
                    Please remember that submitting a request does not automatically confirm the
                    order. Our pastry team will reach out to you via{' '}
                    <strong>{submittedInquiry.phoneOrWhatsapp}</strong> or{' '}
                    <strong>{submittedInquiry.email}</strong> to confirm date availability and
                    finalize your design.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmittedInquiry(null);
                      setDesignDescription('');
                      setAdditionalNotes('');
                    }}
                    className="px-6 py-3 bg-[#352820] text-[#FFFCF7] text-xs font-medium rounded hover:bg-[#9A6A43] transition-colors"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="border-b border-[#352820]/10 pb-4">
                    <h2 className="font-serif-display text-2xl md:text-3xl font-semibold text-[#352820]">
                      Request a Custom Cake Consultation
                    </h2>
                    <p className="text-xs text-[#352820]/70 mt-1">
                      Complete the details below. Submitting a request does not automatically
                      confirm the order; our bakery will review and confirm availability with you.
                    </p>
                  </div>

                  {errorMsg && (
                    <div className="p-3.5 bg-[#9A6A43]/15 border border-[#9A6A43] rounded text-xs text-[#352820] font-medium">
                      {errorMsg}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[#352820] mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="e.g., Clara Laurent"
                        className="w-full px-3.5 py-2.5 text-sm bg-[#F8F4EC] border border-[#352820]/20 rounded focus:outline-none focus:border-[#9A6A43]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#352820] mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full px-3.5 py-2.5 text-sm bg-[#F8F4EC] border border-[#352820]/20 rounded focus:outline-none focus:border-[#9A6A43]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[#352820] mb-1.5">
                        Telephone or WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phoneOrWhatsapp}
                        onChange={(e) => setPhoneOrWhatsapp(e.target.value)}
                        placeholder="+1 (555) 000-0000"
                        className="w-full px-3.5 py-2.5 text-sm bg-[#F8F4EC] border border-[#352820]/20 rounded focus:outline-none focus:border-[#9A6A43]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#352820] mb-1.5">
                        Celebration Occasion *
                      </label>
                      <select
                        value={occasion}
                        onChange={(e) => setOccasion(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm bg-[#F8F4EC] border border-[#352820]/20 rounded focus:outline-none focus:border-[#9A6A43]"
                      >
                        <option value="Birthday Celebration">Birthday Celebration</option>
                        <option value="Wedding / Elopement">Wedding / Elopement</option>
                        <option value="Engagement / Anniversary">Engagement / Anniversary</option>
                        <option value="Baby Shower / Baptism">Baby Shower / Baptism</option>
                        <option value="Corporate / Private Dinner">Corporate / Private Dinner</option>
                        <option value="Other Special Milestone">Other Special Milestone</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[#352820] mb-1.5">
                        Desired Event / Collection Date *
                      </label>
                      <input
                        type="date"
                        required
                        min={minDateStr}
                        value={desiredDate}
                        onChange={(e) => setDesiredDate(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm bg-[#F8F4EC] border border-[#352820]/20 rounded focus:outline-none focus:border-[#9A6A43]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#352820] mb-1.5">
                        Approximate Number of Servings *
                      </label>
                      <select
                        value={servings}
                        onChange={(e) => setServings(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm bg-[#F8F4EC] border border-[#352820]/20 rounded focus:outline-none focus:border-[#9A6A43]"
                      >
                        <option value="8–12 Guests (Intimate 6-Inch)">
                          8–12 Guests (Intimate 6-Inch)
                        </option>
                        <option value="15–20 Guests (Single or Two-Tier)">
                          15–20 Guests (Single or Two-Tier)
                        </option>
                        <option value="25–40 Guests (Two-Tier Celebration)">
                          25–40 Guests (Two-Tier Celebration)
                        </option>
                        <option value="50–80 Guests (Multi-Tier Event)">
                          50–80 Guests (Multi-Tier Event)
                        </option>
                        <option value="80+ Guests (Grand Wedding / Banquet)">
                          80+ Guests (Grand Wedding / Banquet)
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[#352820] mb-1.5">
                        Preferred Cake Flavour Profile *
                      </label>
                      <select
                        value={preferredFlavor}
                        onChange={(e) => setPreferredFlavor(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm bg-[#F8F4EC] border border-[#352820]/20 rounded focus:outline-none focus:border-[#9A6A43]"
                      >
                        <option value="Madagascar Vanilla Bean & Raspberry Preserve">
                          Vanilla Bean &amp; Raspberry Preserve
                        </option>
                        <option value="Valrhona Dark Chocolate & Salted Caramel Ganache">
                          Dark Chocolate &amp; Salted Caramel
                        </option>
                        <option value="Roasted Pistachio, Orange Blossom & Mascarpone">
                          Roasted Pistachio &amp; Mascarpone
                        </option>
                        <option value="Lemon Curd, Elderflower & Vanilla Sponge">
                          Lemon Curd &amp; Elderflower
                        </option>
                        <option value="Hazelnut Praline & Milk Chocolate Mousse">
                          Hazelnut Praline &amp; Chocolate
                        </option>
                        <option value="Custom Flavour (Described in Notes)">
                          Custom Flavour (Describe Below)
                        </option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#352820] mb-1.5">
                        Approximate Budget Range (Optional)
                      </label>
                      <input
                        type="text"
                        value={budgetRange}
                        onChange={(e) => setBudgetRange(e.target.value)}
                        placeholder="e.g., $120 – $250"
                        className="w-full px-3.5 py-2.5 text-sm bg-[#F8F4EC] border border-[#352820]/20 rounded focus:outline-none focus:border-[#9A6A43]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#352820] mb-1.5">
                      Design Description &amp; Aesthetic Inspiration *
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={designDescription}
                      onChange={(e) => setDesignDescription(e.target.value)}
                      placeholder="Describe your colour palette, buttercream texture (smooth, palette knife, vintage piping), florals, or inscription..."
                      className="w-full px-3.5 py-2.5 text-sm bg-[#F8F4EC] border border-[#352820]/20 rounded focus:outline-none focus:border-[#9A6A43]"
                    />
                  </div>

                  {/* Inspiration Image Upload */}
                  <div>
                    <label className="block text-xs font-medium text-[#352820] mb-1.5">
                      Upload Design Inspiration Image (Optional)
                    </label>
                    <div className="flex items-center gap-4">
                      <label className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#F8F4EC] border border-[#352820]/20 rounded text-xs font-medium text-[#352820] hover:bg-[#EFE6D8] cursor-pointer transition-colors">
                        <Upload className="w-3.5 h-3.5 text-[#9A6A43]" />
                        <span>{inspirationImageName || 'Choose Reference Photo'}</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </label>
                      {inspirationImagePreview && (
                        <div className="flex items-center gap-2">
                          <img
                            src={inspirationImagePreview}
                            alt="Uploaded cake inspiration preview"
                            referrerPolicy="no-referrer"
                            className="w-10 h-10 rounded object-cover border border-[#352820]/20"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setInspirationImageName('');
                              setInspirationImagePreview('');
                            }}
                            className="text-xs text-[#9A6A43] hover:underline"
                          >
                            Remove
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#352820] mb-1.5">
                      Additional Notes or Dietary Requirements (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={additionalNotes}
                      onChange={(e) => setAdditionalNotes(e.target.value)}
                      placeholder="Allergies, venue delivery questions, or preferred consultation time..."
                      className="w-full px-3.5 py-2 text-sm bg-[#F8F4EC] border border-[#352820]/20 rounded focus:outline-none focus:border-[#9A6A43]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 px-6 bg-[#352820] text-[#FFFCF7] text-sm font-medium rounded hover:bg-[#9A6A43] transition-colors disabled:opacity-50 min-h-[46px]"
                  >
                    {submitting ? 'Sending Custom Cake Inquiry...' : 'Submit Custom Cake Inquiry'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

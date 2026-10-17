"use client";

import { ArrowLeft, ArrowRight, Camera, ChevronDown, Home, Paintbrush, Send, Sparkles, Wrench, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const projectTypes = [
  { value: "Garage floor", icon: Home, label: "Garage Floor" },
  { value: "Patio or porch", icon: Sparkles, label: "Patio / Porch" },
  { value: "Basement or home gym", icon: Paintbrush, label: "Basement / Gym" },
  { value: "Laundry or utility room", icon: Wrench, label: "Laundry / Utility" },
];

const garageSizes = ["1-car garage", "2-car garage", "3-car garage", "Other / unsure"];
const timelines = ["ASAP", "1–3 months", "Just researching"];

interface QuoteFormProps {
  idPrefix: string;
  buttonLabel: string;
  light?: boolean;
  defaultProjectType?: string;
}

export function QuoteForm({ idPrefix, buttonLabel, light = false, defaultProjectType }: QuoteFormProps) {
  const [step, setStep] = useState(1);
  const [projectType, setProjectType] = useState(defaultProjectType ?? "");
  const [garageSize, setGarageSize] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [zip, setZip] = useState("");
  const [timeline, setTimeline] = useState("");
  const [timelineOpen, setTimelineOpen] = useState(false);
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoDragging, setPhotoDragging] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [step1Error, setStep1Error] = useState("");
  const timelineRef = useRef<HTMLDivElement>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (timelineRef.current && !timelineRef.current.contains(e.target as Node)) {
        setTimelineOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isDark = !light;

  const labelClass = light
    ? "text-xs font-black uppercase tracking-widest text-[#5f6b78]"
    : "text-xs font-black uppercase tracking-widest text-gray-500";
  const inputClass = light
    ? "h-12 border border-[#d7dce2] bg-[#f8fafc] px-4 text-sm font-semibold text-[#0d1117] outline-none transition placeholder:text-[#8a96a3] focus:border-[#ea580c]"
    : "h-12 border border-gray-200 bg-gray-100 px-4 text-sm font-semibold text-gray-900 outline-none transition placeholder:text-gray-900/[0.42] focus:border-[#f97316]";
  const headingClass = light ? "text-2xl font-black text-[#0d1117]" : "text-2xl font-black text-gray-900";
  const subClass = light ? "mt-2 text-sm leading-6 text-[#52606d]" : "mt-2 text-sm leading-6 text-gray-500";

  function advanceStep() {
    if (!projectType) {
      setStep1Error("Please select a project type.");
      return;
    }
    setStep1Error("");
    setStep(2);
  }

  function applyPhoto(file: File) {
    if (!file.type.startsWith("image/") || file.size > 4 * 1024 * 1024) return;
    setPhoto(file);
    const reader = new FileReader();
    reader.onload = (ev) => setPhotoPreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  }

  function clearPhoto() {
    setPhoto(null);
    setPhotoPreview(null);
    if (photoInputRef.current) photoInputRef.current.value = "";
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/quote-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, email, zip, projectType, garageSize, timeline, formLocation: idPrefix }),
      });
      if (!res.ok) throw new Error("failed");

      // Fire visualization in background if photo attached — don't block success on this
      if (photo && email) {
        const vizForm = new FormData();
        vizForm.append("image", photo);
        vizForm.append("email", email);
        vizForm.append("style", "charcoal-flake");
        fetch("/api/floor-visualization", { method: "POST", body: vizForm }).catch(() => {});
      }

      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="py-4">
        <p className={headingClass}>We got it!</p>
        <p className={subClass}>
          Thanks, {name}. We received your quote request and will follow up within one business day with estimate
          options, timing, and color guidance.
        </p>
        {photo && email && (
          <p className={`mt-3 text-sm font-semibold ${light ? "text-[#ea580c]" : "text-[#f97316]"}`}>
            Your custom floor visualization is being prepared — check your inbox in about an hour.
          </p>
        )}
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-5">
        <p className={headingClass}>Get Your Free Quote</p>
        <p className={subClass}>2 quick steps. No pressure estimate.</p>
      </div>

      {/* Progress */}
      <div className="mb-6 flex items-center gap-2">
        <div
          className={`h-2 flex-1 rounded-full transition-all ${step >= 1 ? (isDark ? "bg-[#f97316]" : "bg-[#ea580c]") : isDark ? "bg-white/[0.12]" : "bg-[#d7dce2]"}`}
        />
        <div
          className={`h-2 flex-1 rounded-full transition-all ${step >= 2 ? (isDark ? "bg-[#f97316]" : "bg-[#ea580c]") : isDark ? "bg-white/[0.12]" : "bg-[#d7dce2]"}`}
        />
        <span className={`text-xs font-black ${isDark ? "text-gray-400" : "text-[#6b7682]"}`}>
          Step {step} of 2
        </span>
      </div>

      {step === 1 && (
        <div className="grid gap-5">
          {/* Project type */}
          <div>
            <p className={labelClass}>Project type</p>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {projectTypes.map((pt) => {
                const selected = projectType === pt.value;
                return (
                  <button
                    key={pt.value}
                    type="button"
                    onClick={() => { setProjectType(pt.value); setStep1Error(""); }}
                    className={`flex flex-col items-start gap-2 border p-3 text-left transition ${
                      selected
                        ? isDark
                          ? "border-[#f97316] bg-[#f97316]/[0.12]"
                          : "border-[#ea580c] bg-[#ea580c]/[0.08]"
                        : isDark
                        ? "border-gray-200 bg-white/[0.05] hover:border-white/30"
                        : "border-[#d7dce2] bg-white hover:border-[#ea580c]/40"
                    }`}
                  >
                    <pt.icon
                      className={`h-5 w-5 ${selected ? (isDark ? "text-[#f97316]" : "text-[#ea580c]") : isDark ? "text-gray-400" : "text-[#768390]"}`}
                      aria-hidden
                    />
                    <span className={`text-xs font-black ${isDark ? "text-gray-900" : "text-[#0d1117]"}`}>
                      {pt.label}
                    </span>
                  </button>
                );
              })}
            </div>
            {step1Error && <p className="mt-2 text-xs font-bold text-[#f87171]">{step1Error}</p>}
          </div>

          {/* Garage size */}
          <div>
            <p className={labelClass}>Approximate size</p>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {garageSizes.map((size) => {
                const selected = garageSize === size;
                return (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setGarageSize(size)}
                    className={`border px-3 py-2 text-xs font-black transition ${
                      selected
                        ? isDark
                          ? "border-[#f97316] bg-[#f97316]/[0.12] text-[#ea580c]"
                          : "border-[#ea580c] bg-[#ea580c]/[0.08] text-[#ea580c]"
                        : isDark
                        ? "border-gray-200 text-gray-600 hover:border-white/30"
                        : "border-[#d7dce2] text-[#52606d] hover:border-[#ea580c]/40"
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          <button
            type="button"
            onClick={advanceStep}
            className={`inline-flex h-12 w-full items-center justify-center gap-2 text-sm font-black transition ${
              isDark
                ? "bg-[#f97316] text-white hover:bg-[#ea580c]"
                : "bg-[#ea580c] text-gray-900 hover:bg-[#0d6360]"
            }`}
          >
            Next — Contact Info
            <ArrowRight className="h-4 w-4" aria-hidden />
          </button>
        </div>
      )}

      {step === 2 && (
        <form onSubmit={handleSubmit} className="grid gap-4">
          <label className="grid gap-2">
            <span className={labelClass}>Name</span>
            <input
              className={inputClass}
              name="name"
              placeholder="Your name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label className="grid gap-2">
            <span className={labelClass}>Phone</span>
            <input
              className={inputClass}
              name="phone"
              placeholder="(626) 000-0000"
              required
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </label>
          <label className="grid gap-2">
            <span className={labelClass}>Email</span>
            <input
              className={inputClass}
              name="email"
              placeholder="you@example.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label className="grid gap-2">
              <span className={labelClass}>ZIP</span>
              <input
                className={inputClass}
                name="zip"
                placeholder="91101"
                required
                inputMode="numeric"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
              />
            </label>
            <div className="grid gap-2">
              <span className={labelClass}>Timeline</span>
              <div ref={timelineRef} className="relative">
                <button
                  type="button"
                  onClick={() => setTimelineOpen((o) => !o)}
                  className={`${inputClass} flex w-full items-center justify-between pr-3`}
                >
                  <span className={timeline ? "" : light ? "text-[#8a96a3]" : "text-gray-900/[0.42]"}>
                    {timeline || "Select"}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 transition-transform duration-200 ${timelineOpen ? "rotate-180" : ""} ${light ? "text-[#8a96a3]" : "text-gray-400"}`}
                    aria-hidden
                  />
                </button>
                {timelineOpen && (
                  <ul
                    role="listbox"
                    className="absolute left-0 right-0 top-[calc(100%+4px)] z-50 overflow-hidden border border-[#d7dce2] bg-white shadow-lg"
                  >
                    {timelines.map((t) => (
                      <li
                        key={t}
                        role="option"
                        aria-selected={timeline === t}
                        onClick={() => { setTimeline(t); setTimelineOpen(false); }}
                        className={`cursor-pointer px-4 py-3 text-sm font-semibold transition-colors ${
                          timeline === t
                            ? "bg-[#ea580c]/[0.08] text-[#ea580c]"
                            : "text-[#0d1117] hover:bg-[#f8fafc]"
                        }`}
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>

          {/* Optional photo upload */}
          <div>
            <p className={labelClass}>
              Photo of your space{" "}
              <span className={`font-semibold normal-case tracking-normal ${light ? "text-[#8a96a3]" : "text-gray-400"}`}>
                — optional
              </span>
            </p>
            <p className={`mt-1 text-xs leading-5 ${light ? "text-[#52606d]" : "text-gray-500"}`}>
              Add a photo and we&apos;ll include a custom floor visualization with your estimate.
            </p>

            {photoPreview ? (
              <div className="relative mt-2">
                <img
                  src={photoPreview}
                  alt="Your space preview"
                  className="h-36 w-full object-cover"
                />
                <button
                  type="button"
                  onClick={clearPhoto}
                  aria-label="Remove photo"
                  className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center bg-black/60 text-white transition hover:bg-black/80"
                >
                  <X className="h-4 w-4" aria-hidden />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => photoInputRef.current?.click()}
                onDragOver={(e) => { e.preventDefault(); setPhotoDragging(true); }}
                onDragLeave={() => setPhotoDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setPhotoDragging(false);
                  const file = e.dataTransfer.files?.[0];
                  if (file) applyPhoto(file);
                }}
                className={`mt-2 flex h-24 w-full flex-col items-center justify-center gap-2 border-2 border-dashed transition ${
                  photoDragging
                    ? isDark
                      ? "border-[#f97316] bg-[#f97316]/[0.08]"
                      : "border-[#ea580c] bg-[#ea580c]/[0.06]"
                    : isDark
                    ? "border-gray-200 bg-white/[0.03] hover:border-gray-300"
                    : "border-[#d7dce2] bg-[#f8fafc] hover:border-[#ea580c]/40"
                }`}
              >
                <Camera className={`h-6 w-6 ${isDark ? "text-gray-400" : "text-[#768390]"}`} aria-hidden />
                <span className={`text-xs font-bold ${isDark ? "text-gray-400" : "text-[#52606d]"}`}>
                  Click to upload or drag a photo here
                </span>
                <span className={`text-[10px] ${isDark ? "text-gray-600" : "text-[#9aacba]"}`}>
                  JPG, PNG, HEIC — under 4 MB
                </span>
              </button>
            )}

            <input
              ref={photoInputRef}
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) applyPhoto(file);
              }}
            />
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setStep(1)}
              className={`inline-flex h-12 items-center justify-center gap-1 border px-4 text-sm font-black transition ${
                isDark
                  ? "border-gray-200 text-gray-900 hover:border-white/40"
                  : "border-[#d7dce2] text-[#0d1117] hover:border-[#ea580c]/50"
              }`}
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
              Back
            </button>
            <button
              type="submit"
              disabled={status === "sending"}
              className={`inline-flex h-12 flex-1 items-center justify-center gap-2 text-sm font-black transition disabled:cursor-wait disabled:opacity-70 ${
                isDark
                  ? "bg-[#f97316] text-white hover:bg-[#ea580c]"
                  : "bg-[#ea580c] text-gray-900 hover:bg-[#0d6360]"
              }`}
            >
              {status === "sending" ? "Sending..." : buttonLabel}
              <Send className="h-4 w-4" aria-hidden />
            </button>
          </div>

          {status === "error" && (
            <p className={`text-sm font-bold ${light ? "text-[#b42318]" : "text-[#fda29b]"}`}>
              Something went wrong — please try again.
            </p>
          )}
        </form>
      )}
    </div>
  );
}

"use client";

import React, { useActionState } from "react";
import { submitContactForm, ContactFormState } from "@/app/actions/contact";
import { Loader2, MailCheck, ShieldAlert } from "lucide-react";

const initialState: ContactFormState = {};

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContactForm, initialState);

  return (
    <div className="w-full">
      {state.success && (
        <div className="mb-6 p-6 bg-primary/10 border border-primary/20 rounded-xl flex items-start gap-4 text-left animate-fade-in">
          <MailCheck className="w-6 h-6 text-primary shrink-0 mt-0.5" />
          <div className="flex flex-col gap-1">
            <h4 className="font-bold text-foreground text-sm tracking-wide uppercase">Message Dispatched</h4>
            <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">{state.message}</p>
          </div>
        </div>
      )}

      {state.success ? (
        <div className="p-8 text-center bg-card border border-border rounded-xl flex flex-col items-center gap-4">
          <p className="text-muted-foreground text-sm">Need to send another message?</p>
          <a
            href="/contact"
            className="px-6 py-2.5 bg-secondary text-secondary-foreground border border-border rounded-lg text-xs hover:border-muted-foreground hover:bg-secondary/70 transition-all duration-300"
          >
            New Message
          </a>
        </div>
      ) : (
        <form action={formAction} className="flex flex-col gap-5 text-left">
          {state.message && !state.success && (
            <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg flex items-center gap-3 text-xs text-destructive">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>{state.message}</span>
            </div>
          )}

          {/* Name Field */}
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              disabled={isPending}
              className={`px-4 py-3 bg-background border rounded-lg text-sm text-foreground focus:outline-none focus:border-primary transition-all duration-300 ${
                state.errors?.name ? "border-destructive" : "border-border"
              }`}
              placeholder="E.g. Michael Schustereit"
            />
            {state.errors?.name && (
              <span className="text-[10px] text-destructive font-semibold">{state.errors.name}</span>
            )}
          </div>

          {/* Email Field */}
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              disabled={isPending}
              className={`px-4 py-3 bg-background border rounded-lg text-sm text-foreground focus:outline-none focus:border-primary transition-all duration-300 ${
                state.errors?.email ? "border-destructive" : "border-border"
              }`}
              placeholder="E.g. author@mysticvaultsociety.com"
            />
            {state.errors?.email && (
              <span className="text-[10px] text-destructive font-semibold">{state.errors.email}</span>
            )}
          </div>

          {/* Message Field */}
          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              disabled={isPending}
              className={`px-4 py-3 bg-background border rounded-lg text-sm text-foreground focus:outline-none focus:border-primary transition-all duration-300 ${
                state.errors?.message ? "border-destructive" : "border-border"
              }`}
              placeholder="Briefly describe your project, genre, word count, and what services you need support with..."
            />
            {state.errors?.message && (
              <span className="text-[10px] text-destructive font-semibold">{state.errors.message}</span>
            )}
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/95 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm uppercase tracking-wider font-serif shadow-lg shadow-primary/10 hover:shadow-primary/20"
          >
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Dispatching Request...
              </>
            ) : (
              "Send Message"
            )}
          </button>
        </form>
      )}
    </div>
  );
}

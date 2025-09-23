import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile';
import React, { type HTMLInputTypeAttribute } from 'react';

export interface Input {
  type: HTMLInputTypeAttribute;
  name: string;
  label?: string;
  autocomplete?: string;
  placeholder?: string;
}

export interface Textarea {
  label?: string;
  name?: string;
  placeholder?: string;
  rows?: number;
}

export interface Form {
  inputs?: Array<Input>;
  textarea?: Textarea;
  button?: string;
  description?: string;
  cloudflareSiteKey: string;
}

const ContactForm: React.FC<Form> = ({
  inputs = [],
  textarea,
  button = 'Contactez-nous',
  cloudflareSiteKey,
}) => {
  const turnstileRef = React.useRef<TurnstileInstance>(null);
  const [captchaToken, setCaptchaToken] = React.useState<string | null>(null);
  const [contactForm, setContactForm] = React.useState<{
    name: string;
    email: string;
    message: string;
    [key: string]: string | boolean;
  }>({
    name: '',
    email: '',
    message: '',
  });

  const [submitState, setSubmitState] = React.useState({
    success: false,
    error: false,
    loading: false,
  });

  async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setSubmitState({ success: false, error: false, loading: true });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: contactForm.name,
          email: contactForm.email,
          message: contactForm.message,
          token: captchaToken,
        }),
      });

      if (!response.ok) {
        throw new Error("Une erreur est survenue lors de l'envoi du formulaire.");
      }
      setSubmitState((prevState) => ({
        ...prevState,
        success: true,
        loading: false,
      }));
      setContactForm({ ...contactForm, name: '', email: '', message: '' });
      turnstileRef.current?.reset();
    } catch {
      setSubmitState((prevState) => ({
        ...prevState,
        error: true,
        loading: false,
      }));
    } finally {
      setTimeout(() => {
        setSubmitState({ success: false, error: false, loading: false });
      }, 5000);
    }
  }

  return (
    <form onSubmit={handleFormSubmit} className='w-10/12'>
      {inputs.map(
        ({
          type = "text",
          name,
          label = "",
          autocomplete = "on",
          placeholder = "",
        }) =>
          name && (
            <div className="mb-6 w-full" key={name}>
              {label && (
                <label htmlFor={name} className="block text-sm font-medium">
                  {label}
                </label>
              )}
              <input
                type={type}
                name={name}
                id={name}
                value={typeof contactForm[name] === "boolean" ? "" : contactForm[name]}
                onChange={(e) =>
                  setContactForm({
                    ...contactForm,
                    [e.target.name]: e.target.value,
                  })
                }
                autoComplete={autocomplete}
                placeholder={placeholder}
                className="mt-2 py-3 px-4 block w-full text-md rounded-lg border border-gray-500"
              />
            </div>
          )
      )}

      {textarea && (
        <div className='w-full'>
          {textarea.label && (
            <label htmlFor="textarea" className="block text-sm font-medium">
              {textarea.label}
            </label>
          )}
          <textarea
            id="textarea"
            value={contactForm.message}
            onChange={(e) =>
              setContactForm({ ...contactForm, message: e.target.value })
            }
            name={textarea.name ?? "message"}
            rows={textarea.rows ?? 4}
            placeholder={textarea.placeholder}
            className="mt-2 py-3 px-4 block w-full text-md rounded-lg border border-gray-500"
          />
        </div>
      )}

      <div className="mt-3">
        {submitState.success && (
          <div className="p-3 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800">
            Votre message a été envoyé avec succès.
          </div>
        )}
        {submitState.error && (
          <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800">
            Une erreur est survenue lors de l'envoi du message.
          </div>
        )}
        {submitState.loading && (
          <div className="p-3 mb-4 text-sm text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800">
            Envoi en cours...
          </div>
        )}
      </div>

      <div className="w-full flex items-center justify-center">
        <Turnstile
          ref={turnstileRef}
          siteKey={cloudflareSiteKey}
          onSuccess={(token) => {
            setCaptchaToken(token);
          }}
          onExpire={() => {
            setCaptchaToken(null);
          }}
          onError={() => {
            setCaptchaToken(null);
          }}
          options={{
            size: "flexible",
            language: "fr",
            theme: "light",
          }}
        />
      </div>

      {button && (
        <div className="mt-6 grid">
          <button
            className={`rounded-lg py-3 px-4 text-xl font-semibold bg-gray-500 text-white ${
              !(captchaToken !== null) ||
              submitState.loading
                ? "cursor-not-allowed opacity-50"
                : ""
            }`}
            type="submit"
            disabled={
              !(captchaToken !== null) ||
              submitState.loading
            }
          >
            {submitState.loading ? "Envoi..." : button}
          </button>
        </div>
      )}
    </form>
  );
};

export default ContactForm;


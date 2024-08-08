'use client';

import { useState, useRef, useEffect } from 'react';
import styles from '@/styles/ContactForm.module.css';
import emailjs from '@emailjs/browser';

export default function EmailForm() {
  const form = useRef<HTMLFormElement>(null);
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [formSending, setFormSending] = useState(false);
  const [isVarMissing, setIsVarMissing] = useState(true);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [buttonText, setButtonText] = useState('Send Email');
  const [buttonColor, setButtonColor] = useState('var(--tertiary-color)');

  const clearForm = () => {
    setName('');
    setPhoneNumber('');
    setEmail('');
    setTitle('');
    setMessage('');
  };

  useEffect(() => {
    if (
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY &&
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID &&
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
    )
      setIsVarMissing(false);
  }, []);

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    setFormSending(true);
    setSuccessMessage(null);

    if (form.current) {
      emailjs
        .sendForm(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string,
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID as string,
          form.current,
          process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY as string
        )
        .then(
          (result) => {
            console.log(result.text);
            clearForm();
            setButtonColor('green');
            setSuccessMessage('Your message has been sent!');
            setButtonText('Email Sent!');
          },
          (error) => {
            console.log(error.text);
            clearForm();
            setButtonColor('red');
            setSuccessMessage('Error sending your email message...');
          }
        )
        .finally(() => {
          setFormSending(false);

          setTimeout(() => {
            setButtonColor('var(--tertiary-color)');
            setButtonText('Send Email');
          }, 3000);
        });
    } else {
      console.log('Form reference is null');
      setFormSending(false);
    }
  }

  return (
    <form
      ref={form}
      onSubmit={handleSubmit}
      className={styles.contactFormContainer}
    >
      <div className={styles.formGroup}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
            setSuccessMessage(null);
          }}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="phoneNumber">Phone Number</label>
        <input
          type="tel"
          id="phoneNumber"
          name="phone_number"
          value={phoneNumber}
          onChange={(event) => {
            setPhoneNumber(event.target.value);
            setSuccessMessage(null);
          }}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            setSuccessMessage(null);
          }}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
            setSuccessMessage(null);
          }}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          value={message}
          className={styles.messageTextArea}
          onChange={(event) => {
            setMessage(event.target.value);
            setSuccessMessage(null);
          }}
          required
        />
      </div>
      <button
        className="primaryButton"
        type="submit"
        disabled={isVarMissing || formSending}
        style={{ backgroundColor: buttonColor }}
      >
        {buttonText}
      </button>

      {successMessage && (
        <div>
          <p className={styles.successMessage}>{successMessage}</p>
        </div>
      )}
    </form>
  );
}

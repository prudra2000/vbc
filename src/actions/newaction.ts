import './style.css';
import z from 'zod';

// Write TypeScript code!

const email = z
  .string()
  .min(6)
  .regex(new RegExp('.*[A-Z].*'), { message: "A-Z" })
  .regex(new RegExp('.*[a-z].*'), { message: "a-z" })
  .regex(new RegExp('.*[0-9].*'), { message: "NUM" })
  .regex(new RegExp('.*[`~<>?,./!@#$%^&*()\\-_+="\'|{}\\[\\];:\\\\].*'), { message: "SPEC" });

const appDiv: HTMLElement = document.getElementById('app');
appDiv.innerHTML = `<code>${JSON.stringify(
  email.safeParse('passwo12rA')
)}</code>`;

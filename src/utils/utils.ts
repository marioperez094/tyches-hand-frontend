export function capitalizeFirstLetter(string: string): string {
  if (!string) return string;

  let newString = string.split("_").join(" ")
    
  return newString
    .charAt(0)
    .toUpperCase() + newString
    .slice(1)
    .toLowerCase();
};

//Loads the Google recaptcha script on login load
export function loadRecaptchaScript() {
  const siteKey: string = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

  if (!document.querySelector(`script[src*="recaptcha/api.js"]`)) {
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    //Cleanup function: Remove script when unmounting
    return () => {
      document.body.removeChild(script);
    };
  }

  //Return an empty cleanup function if script already exists
  return () => {};
};

export async function getRecaptchaToken() {
  const siteKey: string = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
  
  return new Promise((resolve, reject) => {
    if (!window.grecaptcha) {
      reject(new Error("reCaptcha not loaded"));
      return;
    }

    window.grecaptcha.ready(() => {
      window.grecaptcha.execute(siteKey, { action: "signup"})
        .then(resolve)
        .catch(reject);
    });
  });
};
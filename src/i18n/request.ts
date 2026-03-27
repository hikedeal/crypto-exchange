import {getRequestConfig} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from './routing';

export default getRequestConfig(async (context) => {
  const requestLocale = await context.requestLocale;
  const locale = requestLocale || routing.defaultLocale;
  
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  try {
    const messages = (await import(`../../messages/${locale}.json`)).default;
    return {
      locale: locale as string,
      messages
    };
  } catch (error) {
    console.error('Failed to load messages for:', locale, error);
    return {
      locale: locale as string,
      messages: {}
    };
  }
});

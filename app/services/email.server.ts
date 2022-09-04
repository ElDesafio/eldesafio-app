import type { User } from '@prisma/client';
import sgMail from '@sendgrid/mail';
import type { SendEmailFunction } from 'remix-auth-email-link';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sender = 'app@eldesafio.org';

export const sendMagicLinkEmail: SendEmailFunction<User> = async ({
  magicLink,
  user,
  emailAddress,
}) => {
  // Send the email only if not in E2E environment
  if (!process.env.E2E) {
    const msg = {
      to: emailAddress,
      from: sender,
      templateId: process.env.SENDGRID_TEMPLATE_MAGIC_LINK,
      dynamicTemplateData: {
        magic_link: magicLink,
        name: user?.firstName || '',
      },
    };

    await sgMail.send(msg);
  }
};

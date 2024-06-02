import { z } from 'zod';

export const clientFormSchema = z.object({
  companyName: z
    .string()
    .min(1, {
      message: 'Company Name is required.',
    })
    .max(200, {
      message: 'Company Name Must not be longer than 200 characters.',
    }),
  companyAddress: z
    .string()
    .min(1, {
      message: 'Company Address is required.',
    })
    .max(200, {
      message: 'Company Address must not be longer than 200 characters.',
    }),
  companyEmail: z
    .string()
    .min(1, {
      message: 'Company Email is required.',
    })
    .max(200, {
      message: 'Company Email must not be longer than 200 characters.',
    })
    .email(),
  companyPhoneNumber: z.string(),
  companyMobileNumber: z
    .string()
    .min(1, {
      message: 'Mobile Number is required.',
    })
    .max(200, {
      message: 'Mobile Number must not be longer than 200 characters.',
    }),
  companyDocumentFile: z.string({ required_error: 'Company Document File is required' }),
  companyDocumentType: z
    .string()
    .min(1, {
      message: 'Document Type is required.',
    })
    .max(200, {
      message: 'Document Type must not be longer than 200 characters.',
    }),
  ownerFirstName: z
    .string()
    .min(1, {
      message: 'First name is required.',
    })
    .max(200, {
      message: 'First name must not be longer than 200 characters.',
    }),
  ownerLastName: z
    .string()
    .min(1, {
      message: 'Last name is required.',
    })
    .max(200, {
      message: 'Last name must not be longer than 200 characters.',
    }),
  ownerEmail: z
    .string()
    .min(1, {
      message: 'Email is required.',
    })
    .max(200, {
      message: 'Email must not be longer than 200 characters.',
    })
    .email(),
  ownerPhoneNumber: z.string(),
  ownerMobileNumber: z
    .string()
    .min(1, {
      message: 'Mobile Number is required.',
    })
    .max(200, {
      message: 'Mobile Number must not be longer than 200 characters.',
    }),
  ownerDocumentFile: z.string({ required_error: 'Owner Document File is required' }),
  ownerDocumentType: z
    .string()
    .min(1, {
      message: 'Document Type is required.',
    })
    .max(200, {
      message: 'Document Type must not be longer than 200 characters.',
    }),
  subDomain: z
    .string()
    .min(1, {
      message: 'Subdomain is required.',
    })
    .max(200, {
      message: 'Subdomain must not be longer than 200 characters.',
    }),
  remarks: z
    .string()
    .min(1, {
      message: 'Remarks is required.',
    })
    .max(200, {
      message: 'Remarks must not be longer than 200 characters.',
    }),
  status: z.enum(['APPROVED', 'PROJECT', 'REJECTED'], {
    required_error: 'Status is required.',
  }),
  logo: z.string({ required_error: 'Logo is required' }),
});

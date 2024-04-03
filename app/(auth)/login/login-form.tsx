'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { signIn } from './actions';
import { SpinnerIcon } from '@/app/(books)/components/icons';

const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: 'Name must be at least 2 characters.',
    })
    .email({
      message: 'Must be in email format',
    }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters.',
  }),
  rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

const defaultValues: Partial<LoginFormValues> = {
  email: '',
  password: '',
  rememberMe: false,
};

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues,
  });
  async function onSubmit(formData: LoginFormValues) {
    setIsLoading(true);

    await signIn({
      email: formData.email,
      password: formData.password,
    });

    router.push('/');
    router.refresh();
  }

  return (
    <Form {...form}>
      <FormMessage>{form.formState.errors.root?.message}</FormMessage>
      <form className='space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input {...field} required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type='password' {...field} required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <Button
            variant={'default'}
            type='submit'
            className='w-full font-semibold'
            disabled={isLoading}
          >
            {isLoading && <SpinnerIcon className='mr-2 h-4 w-4 animate-spin' />}
            Sign in
          </Button>
        </div>
      </form>
    </Form>
  );
}

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/Form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/Card';
import { Button } from '@/components/Button';
import { toast } from '@/components/Toaster';
import { Input } from '@/components/Input';
import { cn } from '@/utils/cn';
import { useBoolean } from '@/hooks/useBoolean';
import { sleep } from '@/utils/sleep';
import { TLoginSchema } from '@/types/auth';
import { loginSchema } from '@/schema/loginSchema';
import { doLogin } from '@/api/auth/login';

export default function LoginPage() {
  const { set: setIsLoading } = useBoolean(false);
  const { value: isLogoShown, set: setIsLogoShown } = useBoolean(true);

  const doLoginMutation = useMutation({
    mutationFn: doLogin,
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: ({ token, accountInformation }) => {
      setIsLoading(false);
      setIsLogoShown(true);

      toast({
        description: 'Login success, refreshing',
        className: 'bg-green-700/80 text-white border border-green-500 rounded-none text-center',
        duration: 3000,
      });

      localStorage.setItem('token', token);
      localStorage.setItem('accountId', accountInformation.id);
      localStorage.setItem('image', accountInformation.image as string);
      window.location.href = '/dashboard';
    },
    onError: (error: AxiosError) => {
      toast({
        description: error.message,
        className: 'bg-red-700/70 text-white border border-green-500 rounded-none text-center',
        duration: 3000,
      });
    },
  });

  const form = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (event: TLoginSchema) => {
    await doLoginMutation.mutateAsync({
      ...event,
    });
  };

  useEffect(() => {
    const preLoad = async () => {
      setIsLoading(true);
      await sleep(1000);
      setIsLoading(false);
      setIsLogoShown(false);
    };

    preLoad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative flex h-[100dvh] w-full items-center justify-center bg-primary-100">
      <img
        width={100}
        height={100}
        src="/images/ante-vector.svg"
        alt="logo"
        className="absolute top-0 h-full w-full select-none object-cover"
      />
      {isLogoShown && <img width={80} height={28} src="/images/ante-logo-single.svg" alt="logo" />}
      {!isLogoShown && (
        <Card className="z-50 w-full max-w-md animate-fadeIn" id="authCard">
          <CardHeader className="xs:p-10">
            <img width={80} height={28} src="/images/ante-logo-white.svg" alt="logo" className="mb-5" />
            <CardTitle className="text-balance text-2xl font-bold tracking-tight">
              Manage your workforce effectively with ease!
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-10 xs:px-10">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="Email"
                            className={cn(
                              'peer w-full border-b-2 border-custom-200 placeholder:text-transparent focus:border-primary-100',
                              form.formState.errors.username && 'border-rose-500',
                            )}
                            {...field}
                          />
                          <FormLabel variant="top">Email</FormLabel>
                        </div>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type="password"
                            placeholder="Password"
                            className="peer w-full border-b-2 border-custom-200 placeholder:text-transparent focus:border-primary-100"
                            {...field}
                          />

                          <FormLabel variant="top">Password</FormLabel>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="mt-8 h-14 rounded-lg bg-primary-100 text-base text-white hover:bg-primary-100/90"
                >
                  Login
                </Button>
                <span className="text-center text-base font-semibold text-custom-300 hover:cursor-pointer hover:underline">
                  Forgot Password
                </span>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

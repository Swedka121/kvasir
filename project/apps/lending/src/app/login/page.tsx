'use client';

import Grainient from '@org/ui/components/Grainient';
import { Button } from '@org/ui/components/ui/button';
import * as Card from '@org/ui/components/ui/card';
import * as Field from '@org/ui/components/ui/field';
import { Input } from '@org/ui/components/ui/input';
import * as InGr from '@org/ui/components/ui/input-group';
import { Checkbox } from '@org/ui/components/ui/checkbox';
import Link from 'next/link';
import { Eye, EyeClosed } from 'lucide-react';
import { useState } from 'react';
import z from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as icons from 'simple-icons';
import { SimpleIcon } from '../../components/simple-icon';
import { authClient } from '@/lib/authClient';

const zodLoginSchema = z.object({
  email: z.email(),
  password: z.string(),
  checkedRights: z.literal(true),
});

export default function Page() {
  const [passwordClosed, setPasswordClosed] = useState(false);
  const togglePasswordClosed = () => setPasswordClosed((val) => !val);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<z.infer<typeof zodLoginSchema>>({
    mode: 'onChange',
    resolver: zodResolver(zodLoginSchema),
  });

  const submit = handleSubmit((data) => {
    console.log('Submit!');
  });

  return (
    <section className="w-screen h-screen flex flex-col items-center">
      <div className="mt-20 h-100 relative w-full flex justify-center items-center">
        <div className="absolute w-max h-max z-10">
          <h1 className="text-9xl font-(family-name:--font-goldman) uppercase">
            Kvasir
          </h1>
        </div>
        <Grainient
          colors={['#120f17', '#2a0f0a', '#9a3412', '#f97316', '#fed7aa']}
          angle={55}
          flow={0.8}
          silk={0.35}
          grainAmount={0.08}
          type="linear"
          bands={1}
          softness={1}
          scale={1}
          speed={1}
          grainSize={1.2}
          grainAnimated
          contrast={1}
          saturation={1}
          variation={0}
          interactive
          stir={1}
          clickSwirl
          intro
          lightMode={false}
        />
      </div>
      <Card.Card className="w-max h-max my-auto min-w-100">
        <Card.CardContent className="flex flex-col gap-5">
          <Button
            onClick={() => {
              authClient.signIn.social({
                provider: 'google',
                callbackURL: process.env.NEXT_PUBLIC_LENDING_URL + '/success',
              });
            }}
          >
            <SimpleIcon
              icon={icons.siGoogle}
              width={24}
              height={24}
              aria-hidden="true"
            />
            Continue with Google
          </Button>
          <div className="w-full border-t-2 border-accent/50"></div>
          <form onSubmit={submit}>
            <Field.Field className="gap-5">
              <Field.FieldGroup className="gap-2">
                <Field.FieldLabel>Email</Field.FieldLabel>
                <Field.FieldDescription>
                  Please enter your email
                </Field.FieldDescription>
                <Field.FieldContent>
                  <Input
                    placeholder="example@example.com"
                    {...register('email')}
                  ></Input>
                </Field.FieldContent>
                {errors.email ? (
                  <Field.FieldError>{errors.email.message}</Field.FieldError>
                ) : null}
              </Field.FieldGroup>
              <Field.FieldGroup className="gap-2">
                <Field.FieldLabel>Password</Field.FieldLabel>
                <Field.FieldDescription>
                  Please enter your password
                </Field.FieldDescription>
                <Field.FieldContent>
                  <InGr.InputGroup>
                    <InGr.InputGroupInput
                      placeholder="password"
                      type={passwordClosed ? 'password' : 'text'}
                      {...register('password')}
                    ></InGr.InputGroupInput>
                    <InGr.InputGroupAddon align={'inline-end'}>
                      <Button
                        variant={'ghost'}
                        onClick={togglePasswordClosed}
                        type="button"
                      >
                        {passwordClosed ? <EyeClosed /> : <Eye />}
                      </Button>
                    </InGr.InputGroupAddon>
                  </InGr.InputGroup>
                </Field.FieldContent>
                {errors.password ? (
                  <Field.FieldError>{errors.password.message}</Field.FieldError>
                ) : null}
              </Field.FieldGroup>
              <Field.FieldGroup>
                <Field.FieldContent>
                  <div className="flex flex-row gap-2">
                    <Controller
                      name="checkedRights"
                      render={({ field, fieldState }) => (
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      )}
                      control={control}
                    />

                    <p className="text-xs font-light">
                      I have read and accept our{' '}
                      <Link href={'/policy'} className="text-primary font-bold">
                        Privacy Policy
                      </Link>{' '}
                      and{' '}
                      <Link href="/terms" className="text-primary font-bold">
                        Term of Use
                      </Link>
                    </p>
                  </div>
                </Field.FieldContent>
                {errors.checkedRights ? (
                  <Field.FieldError>
                    {errors.checkedRights.message}
                  </Field.FieldError>
                ) : null}
              </Field.FieldGroup>
              <Field.FieldGroup>
                <Field.FieldContent>
                  <Button disabled={!isValid}>Login</Button>
                </Field.FieldContent>
                {errors.root ? (
                  <Field.FieldError>{errors.root.message}</Field.FieldError>
                ) : null}
              </Field.FieldGroup>
            </Field.Field>
          </form>
        </Card.CardContent>
      </Card.Card>
    </section>
  );
}

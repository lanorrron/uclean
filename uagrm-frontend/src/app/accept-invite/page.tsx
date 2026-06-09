'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import createClient from "@/lib/supabase/client";
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { User } from 'lucide-react';
import { Loader } from '@/@core/components/loader/Loader';
import { useAuth } from '@/hooks/useAuth';
import invitationService from '@/modules/user/services/invitation.service';


type ProfileForm = {
    firstName: string;
    lastName: string;
};

export default function AcceptInvitePage() {
    const router = useRouter();
    const supabase = createClient();
    const { user } = useAuth();

    const [needsProfile, setNeedsProfile] = useState(false);
    const [loading, setLoading] = useState(true);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ProfileForm>({
        mode: 'onBlur',
    });
    useEffect(() => {
        const handleInvite = async () => {
            // 1️⃣ Leer token del hash
            const hash = window.location.hash;
            if (!hash) return;

            const params = new URLSearchParams(hash.replace('#', ''));
            const access_token = params.get('access_token');
            const refresh_token = params.get('refresh_token');

            if (access_token && refresh_token) {
                const { data, error } = await supabase.auth.setSession({
                    access_token,
                    refresh_token,
                });

                if (error) {
                    console.error('Error setting session', error);
                    return;
                }

                try {
                    await invitationService.accepInvitation()
                } catch (error) {
                    console.log(error)
                }

                const meta = data?.session?.user.user_metadata ?? {};
                const hasProfile = Boolean(meta.firstName && meta.lastName);

                if (!hasProfile) {
                    setNeedsProfile(true);
                    setLoading(false);
                } else {
                    router.replace('/dashboard');
                }
            }
        };

        handleInvite();
    }, []);


    const onSubmit = async (form: ProfileForm) => {
        const { error, data } = await supabase.auth.updateUser({
            data: {
                firstName: form.firstName,
                lastName: form.lastName,
                full_name: `${form.firstName} ${form.lastName}`,
            },
        });

        if (error) {
            console.error(error);
            return;
        }

        router.replace('/dashboard');
    };

    if (loading && !needsProfile) {
        return (
            <div className={"h-screen flex items-center justify-center"}>
                <Loader size={"44px"} />
            </div>
        );
    }

    if (needsProfile) {
        return (
            <div className="fixed inset-0 bg-background/90 backdrop-blur-sm flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.25 }}
                    className="w-full max-w-md"
                >
                    <Card className="rounded-3xl">
                        <CardContent className="p-8 space-y-6">
                            <div className="flex flex-col items-center text-center gap-2">
                                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                                    <User className="h-6 w-6 text-primary" />
                                </div>
                                <h2 className="text-2xl font-semibold">
                                    Completa tu perfil
                                </h2>
                                <p className="text-sm text-muted-foreground">
                                    Necesitamos estos datos para continuar
                                </p>
                            </div>

                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className="space-y-4"
                            >
                                <div>
                                    <Input
                                        placeholder="Nombre"
                                        {...register('firstName', {
                                            required: 'El nombre es obligatorio',
                                            minLength: {
                                                value: 2,
                                                message: 'Debe tener al menos 2 caracteres',
                                            },
                                        })}
                                    />
                                    {errors.firstName && (
                                        <p className="text-sm text-red-500 mt-1">
                                            {errors.firstName.message}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <Input
                                        placeholder="Apellido"
                                        {...register('lastName', {
                                            required: 'El apellido es obligatorio',
                                            minLength: {
                                                value: 2,
                                                message: 'Debe tener al menos 2 caracteres',
                                            },
                                        })}
                                    />
                                    {errors.lastName && (
                                        <p className="text-sm text-red-500 mt-1">
                                            {errors.lastName.message}
                                        </p>
                                    )}
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full py-6 text-base"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Guardando...' : 'Continuar'}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        );
    }

    return null;
}

"use client";

import { useMemo, useState } from "react";

import {
    Users,
    Search,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { Loader } from "@/@core/components/loader/Loader";

import { useUsers } from "@/modules/user/hooks/useUsers.hook";

import CreateUser from "@/modules/user/components/InviteUser";
import DeleteUser from "@/modules/user/components/DeleteUser";
import UpdateUser from "@/modules/user/components/UpdateUser";
import { useCancelInvitation } from "@/modules/user/hooks/useCancelInvitation";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useAuth } from "@/hooks/useAuth";
import { Role } from "@/modules/user/types/user.type";

const UsersPage = () => {

    const {
        users,
        invitations,
        loading,
        refetch,
    } = useUsers();

    const {profile} = useAuth();

    const { cancelInvitation } = useCancelInvitation();

    const [searchValue, setSearchValue] =
        useState("");

    const filteredUsers = useMemo(() => {

        const value =
            searchValue.toLowerCase();

        return users.filter(
            (user) =>
                user.first_name
                    ?.toLowerCase().includes(value) ||
                user.last_name
                    ?.toLowerCase().includes(value) ||
                user.email.toLowerCase().includes(value) ||
                user.role.toLowerCase().includes(value)
        );

    }, [users, searchValue]);

    const getInitials = (
        name?: string | null
    ) => {

        if (!name) return "?";

        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .slice(0, 2)
            .toUpperCase();
    };

    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center">
                <Loader size="44px" />
            </div>
        );
    }

    return (
        <div className="space-y-5">

            {/* Header */}
            <Card className="p-4">
                <div className="
    grid gap-4
    md:grid-cols-3
    md:items-center
  ">

                    {/* Left */}
                    <div className="flex items-center gap-3">

                        <div className="
        h-11 w-11 rounded-xl
        bg-primary/10
        flex items-center justify-center
      ">
                            <Users className="w-5 h-5 text-primary" />
                        </div>

                        <div>
                            <h2 className="text-lg font-semibold leading-none">
                                Usuarios
                            </h2>

                            <p className="text-sm text-muted-foreground mt-1">
                                {users.length} usuarios registrados
                            </p>
                        </div>
                    </div>

                    {/* Center */}
                    <div className="relative w-full">

                        <Search className="
        absolute left-3 top-1/2
        -translate-y-1/2
        w-4 h-4 text-muted-foreground
      " />

                        <Input
                            type="search"
                            placeholder="Buscar usuario..."
                            value={searchValue}
                            onChange={(e) =>
                                setSearchValue(e.target.value)
                            }
                            className="pl-9"
                        />
                    </div>

                    {/* Right */}
                    <div className="flex justify-start md:justify-end">
                        <CreateUser onCreated={refetch} />
                    </div>

                </div>
            </Card>



            {/* List */}
            {/* USERS LIST */}
            <div className="space-y-3">

                {filteredUsers.map((user) => (
                    <Card
                        key={user.id}
                        className="p-4 hover:bg-muted/40 transition-colors"
                    >
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                            {/* User */}
                            <div className="flex items-center gap-3 min-w-0">

                                <div className="h-11 w-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-semibold text-sm flex-shrink-0">
                                    {getInitials(user.first_name + " " + user.last_name)}
                                </div>

                                <div className="min-w-0">

                                    <h3 className="font-medium truncate">
                                        {user.first_name} {user.last_name}
                                    </h3>

                                    <p className="text-sm text-muted-foreground truncate">
                                        {user.email}
                                    </p>

                                    <div className="mt-1">
                                        <Badge variant="secondary">
                                            {user.role}
                                        </Badge>
                                    </div>

                                </div>
                            </div>

       
                            <div className="flex items-center gap-2 self-end md:self-auto">
                                <UpdateUser user={user} onUpdated={refetch} />
                                <DeleteUser userId={user.id} onDeleted={refetch} />
                            </div>

                        </div>
                    </Card>
                ))}

                {filteredUsers.length === 0 && (
                    <Card className="p-10">
                        <p className="text-center text-muted-foreground">
                            No se encontraron usuarios
                        </p>
                    </Card>
                )}

            </div>

            {invitations.length > 0 && (
                <div className="mt-10 space-y-3">

                    <h3 className="text-sm font-semibold text-muted-foreground">
                        Invitaciones pendientes
                    </h3>

                    {invitations.map((inv) => (
                        <Card
                            key={inv.id}
                            className="p-4 hover:bg-muted/40 transition-colors"
                        >
                            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

                                {/* Info */}
                                <div className="min-w-0">
                                    <p className="font-medium truncate">
                                        {inv.email}
                                    </p>

                                    <p className="text-sm text-muted-foreground">
                                        Rol: {inv.role}
                                    </p>

                                    <div className="mt-1">
                                        <Badge variant="outline">
                                            {inv.status}
                                        </Badge>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-2 self-end md:self-auto">

                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <button className="text-sm px-3 py-1 border border-red-500 text-red-500 rounded-md hover:bg-red-500/10" > Cancelar </button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle> ¿Cancelar invitación? </AlertDialogTitle>
                                                <AlertDialogDescription> Esta acción cancelará la invitación enviada a{" "} <span className="font-medium"> {inv.email} </span>. </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel> Volver </AlertDialogCancel>
                                                <AlertDialogAction className="bg-red-500 hover:bg-red-600" onClick={async () => { await cancelInvitation(inv.id); refetch(); }} > Sí, cancelar </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>

                                </div>

                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default UsersPage;
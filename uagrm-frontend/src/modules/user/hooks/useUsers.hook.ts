import { useEffect, useState } from "react";
import userService from "../services/user.service";
import { Invitation, User } from "../types/user.type";

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const data = await userService.getAll();

      setUsers(data.users);
      setInvitations(data.invitations);
    } catch (err) {
      setError("Error al obtener usuarios");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    invitations,
    loading,
    error,
    refetch: fetchUsers,
  };
}
'use client'
import { createContext, ReactNode, useEffect, useState } from "react";

// Define el tipo de configuración
export type Settings = {
    navHidden?: boolean;
    navCollapsed: boolean;
};

// Define la interfaz para el valor del contexto
interface SettingContextValue {
    settings: Settings;
    saveSettings: (updatedSettings: Settings) => void;
}

// Define la interfaz para las props del proveedor de contexto
interface SettingsProviderProps {
    children: ReactNode;
}

// Configuración inicial
const initialSettings: Settings = {
    navHidden: false,
    navCollapsed: false,
};

// Función para restaurar la configuración desde localStorage
const restoreSettings = (): Settings | null => {
    let settings: Settings | null = null;
    try {
        const storedData: string | null = window.localStorage.getItem("settings");
        if (storedData) {
            settings = { ...JSON.parse(storedData) };
        } else {
            settings = initialSettings;
        }
    } catch (err) {
        console.log(err);
        settings = initialSettings; // Establecer configuración predeterminada en caso de error
    }
    return settings;
};

// Función para almacenar la configuración en localStorage
const storeSettings = (settings: Settings) => {
    const storedSettings = { ...settings };
    delete storedSettings.navHidden; // Eliminar propiedades que no deben almacenarse
    window.localStorage.setItem("settings", JSON.stringify(storedSettings));
};

// Crear el contexto con valores predeterminados
export const SettingsContext = createContext<SettingContextValue>({
    saveSettings: () => null,
    settings: initialSettings,
});

// Proveedor del contexto de configuración
export const SettingsProvider = ({ children }: SettingsProviderProps) => {
    const [settings, setSettings] = useState<Settings>({ ...initialSettings });

    useEffect(() => {
        const restoredSettings = restoreSettings();
        if (restoredSettings) {
            setSettings({ ...restoredSettings });
        }
    }, []);
    useEffect(() => {
        const handleResize = () => {
            const isSmallScreen = window.matchMedia("(max-width: 1200px)").matches;

            setSettings(prev => {
                if (prev.navHidden === isSmallScreen) return prev;

                const updated = {
                    ...prev,
                    navHidden: isSmallScreen,
                };

                storeSettings(updated);
                return updated;
            });
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [settings.navHidden]);

    const saveSettings = (updatedSettings: Settings) => {
        storeSettings(updatedSettings);
        setSettings(updatedSettings);
    };

    return (
        <SettingsContext.Provider value={{ settings, saveSettings }}>
            {children}
        </SettingsContext.Provider>
    );
};

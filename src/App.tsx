import React, {useState} from 'react';
import './App.css';
import Login from "./screens/Login";
import MainScreen from "./screens/MainScreen";
import {createClient, Session, User} from "@supabase/supabase-js";
import {Box} from "@chakra-ui/react";
import dayjs from "dayjs";
import "dayjs/plugin/updateLocale";

const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZ' +
    'iI6InZkZXBxdWdibW1wb291cnhham1sIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDU4NTkxNTgsImV4cCI6MTk' +
    '2MTQzNTE1OH0.CC3yGw_x9EFX3tLGlMOr9VZePfRmL4L_6X2X_Efpcu4';

const supabaseUrl = 'https://vdepqugbmmpoourxajml.supabase.co';

function App() {
    const [supabase] = useState(() => createClient(supabaseUrl, supabaseAnonKey));
    const [user, setUser] = useState<User>();
    const [session, setSession] = useState<Session>();

    dayjs.extend(require("dayjs/plugin/weekday"));
    dayjs.extend(require("dayjs/plugin/updateLocale"));
    dayjs.updateLocale(dayjs().locale(), {weekStart: 1})

    if (user && session) {
        return <Box display="relative" w="100vw" h="100vh">
            <MainScreen supabaseClient={supabase} user={user} session={session}/>
        </Box>
    }

    return <Login supabaseClient={supabase} onLoggedIn={(user, session) => {
        setUser(user);
        setSession(session);
    }}/>;
}

export default App;

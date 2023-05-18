import { useEffect, useState } from "react";
//@ts-ignore
import type { Pokemon } from "../../../types/pokemon"

const POKE_API = "http://localhost:6006";

const POKE_RANDOM_ENDPOINT = "/pokemons/random/";

export function usePokeApi() {

    const [pokemons, setPokemons] = useState({loading: false, data: [] as Pokemon[]});

    async function getRandomPokemons(quantity = 20) {
        setPokemons({ loading: true, data: pokemons.data });
        const data:Pokemon[] = await fetch(POKE_API+POKE_RANDOM_ENDPOINT+quantity).then(r=>r.json()).catch(e=>[]);
        setPokemons({ loading: false, data });
    }

    useEffect(() => {
        getRandomPokemons(20);
    }, []);

    return {
        pokemons,
        setPokemons,
        getRandomPokemons
    }

}

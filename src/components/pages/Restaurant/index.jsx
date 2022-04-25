import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export const Restaurant = () => {
    const params = useParams();

    const [restaurant, setRestaurant] = useState({});

    useEffect(() => {
        axios
            .get(`/api/restaurants/${params.id}`)
            .then((response) => setRestaurant(response.data.information))
            .catch((error) => console.log(error));
    }, []);

    return (
        <div>
            <div>{restaurant.id}</div>
            <div>{restaurant.name}</div>
            <div>{restaurant.id}</div>
        </div>
    );
};

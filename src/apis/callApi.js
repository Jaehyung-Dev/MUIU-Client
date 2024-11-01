import axios from "axios";

export const createCallRoom = async (offerSdp, roomId) => {
    try {
        const response = await axios.post("/api/callroom/create", {
            offerSdp,
            roomId,
        });
        
        if (response.data && response.data.roomId) {
            return response.data;
        } else {
            console.error("No roomId found in response:", response.data);
            return null;
        }
    } catch (error) {
        console.error("Error creating call room:", error);
        return null;
    }
};

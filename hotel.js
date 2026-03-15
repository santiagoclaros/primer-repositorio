// sistema-reserva.js

// Reservation System

const reservationMenu = () => {
    console.log("Welcome to the Reservation System!");
    console.log("1. Make a Reservation");
    console.log("2. View Reservations");
    console.log("3. Cancel a Reservation");
    console.log("4. Exit");
    
    const choice = prompt("Please select an option:");

    switch(choice) {
        case '1':
            makeReservation();
            break;
        case '2':
            viewReservations();
            break;
        case '3':
            cancelReservation();
            break;
        case '4':
            console.log("Exiting the system. Have a great day!");
            break;
        default:
            console.log("Invalid choice. Please try again.");
            reservationMenu();
    }
};

const makeReservation = () => {
    const name = prompt("Enter your name:");
    const date = prompt("Enter the date of reservation:");
    // Logic to save reservation
    console.log(`Reservation made for ${name} on ${date}.`);
};

const viewReservations = () => {
    // Logic to view reservations
    console.log("Here are your reservations:");
};

const cancelReservation = () => {
    const reservationId = prompt("Enter your reservation ID to cancel:");
    // Logic to cancel reservation
    console.log(`Reservation ${reservationId} has been canceled.`);
};

reservationMenu();
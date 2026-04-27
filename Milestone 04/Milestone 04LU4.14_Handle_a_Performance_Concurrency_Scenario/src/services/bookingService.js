const { PrismaClient, Prisma } = require('@prisma/client');

const prisma = new PrismaClient();

/**
 * Creates a booking for a given user, seat, and show
 * Handles unique constraint violation (P2002)
 */
async function createBooking(data) {
  try {
    const booking = await prisma.booking.create({
      data: {
        userId: data.userId,
        seatId: data.seatId,
        showId: data.showId
      }
    });

    return {
      success: true,
      booking
    };

  } catch (error) {
    // Handle duplicate booking (same seatId + showId)
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      return {
        success: false,
        status: 409,
        message: 'Seat already booked for this show'
      };
    }

    // Let other errors be handled globally
    throw error;
  }
}

module.exports = {
  createBooking
};
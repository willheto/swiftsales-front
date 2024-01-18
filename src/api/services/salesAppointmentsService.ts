import axiosInstance from '../axiosInstance';
import Service from './service';

class SalesAppointmentsService extends Service<SalesAppointmentInterface> {

	getSalesAppointment = async (salesAppointmentID: string) => {
		return await axiosInstance.get(`sales-appointments/${salesAppointmentID}`);
	}
}

const salesAppointments = new SalesAppointmentsService({
	serviceURL: `sales-appointments`,
	keyParameter: 'salesAppointmentID',
	crudResponseObject: 'salesAppointment',
	crudResponseArray: 'salesAppointments',
});

export default salesAppointments;

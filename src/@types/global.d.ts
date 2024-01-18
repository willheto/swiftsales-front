declare const API_BASE_URL: string;

interface UserInterface {
	userID: number;
	firstName: string;
	lastName: string;
	email: string;
}

interface LeadInterface {
	leadID: number;
	businessID: number | null;
	companyName: string;
	contactPerson: string | null;
	contactPhone: string | null;
	contactEmail: string | null;
	header: string | null;
	description: string | null;
	created_at: string;
	updated_at: string;
}

interface SalesAppointmentInterface {
	salesAppointmentID: number;
	leadID: number;
	timeStart: string;
	timeEnd: string;
	notes: string | null;
	meetingUrl: string;
	salesAppointmentFiles: SalesAppointmentFileInterface[];
	created_at: string;
	updated_at: string;
}

interface SalesAppointmentFileInterface {
	salesAppointmentFileID: number;
	salesAppointmentID: number;
	fileID: number;
	file: FileInterface;
	created_at: string;
	updated_at: string;
}

interface FileInterface {
	fileID: number;
	fileName: string;
	filePath: string;
	fileType: string;
	created_at: string;
	updated_at: string;
}



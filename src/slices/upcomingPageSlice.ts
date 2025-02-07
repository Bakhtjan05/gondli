import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Service {
    name: string;
    category: string;
    duration: number;
    price: number;
    discounted_price: number; 
    
}

interface GroupedServices {
    [category: string]: Service[];
}

interface UpcomingPageState {
    servicesData: any | null;
    selectedService: any | null;
    selectedServicePrice: any | null;
    selectedDate: string;
    selectedTime: string;
    groupedServices: GroupedServices;  // Заменяем any[] на Service[]
    isUpcomingPage: boolean;
    userName: string;
    isAuthenticated: boolean;
    fullName: string;
    email: string;
    phoneNumber: string;
    additionalComment: string;
}

const initialState: UpcomingPageState = {
    servicesData: null,
    selectedService: null,
    selectedServicePrice: null,
    selectedDate: '',
    selectedTime: '',
    groupedServices: {} as GroupedServices,
    isUpcomingPage: false,
    userName: '',
    isAuthenticated: false,
    fullName: "",
    email: "",
    phoneNumber: "",
    additionalComment: "",
    
};

const upcomingPageSlice = createSlice({
    name: 'upcomingPage',
    initialState,
    reducers: {
        setServicesData: (state, action: PayloadAction<any>) => {
            state.servicesData = action.payload;
        },
        setSelectedService: (state, action: PayloadAction<any>) => {
            state.selectedService = action.payload;
        },
        setSelectedServicePrice: (state, action: PayloadAction<any>) => {
            state.selectedServicePrice = action.payload;
        },
        setSelectedDate: (state, action: PayloadAction<string>) => {
            state.selectedDate = action.payload;
        },
        setSelectedTime: (state, action: PayloadAction<string>) => {
            state.selectedTime = action.payload;
        },
        setGroupedServices: (state, action: PayloadAction<GroupedServices>) => {
            state.groupedServices = action.payload;
        },
        setIsUpcomingPage: (state, action: PayloadAction<boolean>) => {
            state.isUpcomingPage = action.payload;
        },
        setUserName: (state, action: PayloadAction<string>) => {
            state.userName = action.payload;
        },
        setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
            state.isAuthenticated = action.payload;
        },
        setFullName: (state, action: PayloadAction<string>) => {
            state.fullName = action.payload;
        },
        setEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
        },
        setPhoneNumber: (state, action: PayloadAction<string>) => {
            state.phoneNumber = action.payload;
        },
        setAdditionalComment: (state, action: PayloadAction<string>) => {
            state.additionalComment = action.payload;
        },
    },
});

export const {
    setServicesData,
    setSelectedService,
    setSelectedServicePrice,
    setSelectedDate,
    setSelectedTime,
    setGroupedServices,
    setIsUpcomingPage,
    setUserName,
    setIsAuthenticated,
    setFullName,
    setEmail,
    setPhoneNumber,
    setAdditionalComment

} = upcomingPageSlice.actions;

export const selectUpcomingPageState = (state: any) => state.upcomingPage;

export default upcomingPageSlice.reducer;
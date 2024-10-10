
import { ACTIONS_AUTH } from "@/bus/domain/services/repositories/redux/auth";
import { IPlatformReduxRepository } from "@/bus/domain/services/repositories/redux/i-platform-redux-repository";

import { useAppDispatch } from '@bus/core/config/index';


export class PlatformReduxRepository extends IPlatformReduxRepository {
    private static instance: PlatformReduxRepository;
    private dispatch = useAppDispatch();

    private constructor() {
        super();
    }

    public static getInstance(): PlatformReduxRepository {
        if (!PlatformReduxRepository.instance)
            PlatformReduxRepository.instance = new PlatformReduxRepository();
        return PlatformReduxRepository.instance;
    }

    public savePlatform(
        params: any
    ): void {
        this.dispatch(ACTIONS_AUTH.addPlatformAction(params));
    };
}
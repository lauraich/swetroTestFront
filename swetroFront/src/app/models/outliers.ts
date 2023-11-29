import { MetricsAverage } from "./metricsAverage";

export class Outliers {
    Id!: number;
    UserId!: number;
    StartTimeInSeconds!: number;
    DurationInSeconds!: number;
    DistanceInMeters!: number;
    Steps!: number;
    AverageSpeedInMetersPerSecond!: number;
    AveragePaceInMinutesPerKilometer!: number;
    TotalElevationGainInMeters!: number;
    AverageHeartRateInBeatsPerMinute!: number;
    File!: string;
    Reason!: string[];
    Average!: MetricsAverage
}

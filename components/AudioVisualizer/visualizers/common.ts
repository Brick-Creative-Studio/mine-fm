import { ICoordinateMapper } from "@/components/mappers/coordinateMappers/common";
import { IMotionMapper } from "@/components/mappers/motionMappers/common";
import { IScalarTracker } from "@/components/mappers/valueTracker/common";
import { ColorPaletteType } from "./palettes";

export interface VisualProps {
    coordinateMapper: ICoordinateMapper;
    scalarTracker: IScalarTracker;
    palette?: ColorPaletteType;
}

export interface MotionVisualProps {
    motionMapper: IMotionMapper;
    scalarTracker?: IScalarTracker;
    palette?: ColorPaletteType;
}

﻿import { TypeStore } from "@needle-tools/engine/engine/engine_typestore"

// Import types
import { SplineContainer } from "../SplineContainer.ts";
import { SplineWalker } from "../SplineWalker.ts";

// Register types
TypeStore.add("SplineContainer", SplineContainer);
TypeStore.add("SplineWalker", SplineWalker);

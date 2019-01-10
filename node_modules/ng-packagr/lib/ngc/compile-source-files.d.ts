import * as ng from '@angular/compiler-cli';
import * as ts from 'typescript';
import { StylesheetProcessor } from '../ng-v5/entry-point/resources/stylesheet-processor';
import { BuildGraph } from '../brocc/build-graph';
import { EntryPointNode } from '../ng-v5/nodes';
export declare function compileSourceFiles(graph: BuildGraph, entryPoint: EntryPointNode, tsConfig: ng.ParsedConfiguration, moduleResolutionCache: ts.ModuleResolutionCache, stylesheetProcessor: StylesheetProcessor, extraOptions?: Partial<ng.CompilerOptions>, declarationDir?: string): Promise<void>;

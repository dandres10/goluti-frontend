export abstract class Mapper<I, O> {
    abstract mapFrom(param: I): O;
    abstract mapFromList(params: I[]): O[];
    abstract mapTo(param: O): I;
    abstract mapToList(params: O[]): I[];
}
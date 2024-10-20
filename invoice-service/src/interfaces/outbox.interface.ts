export interface IOutboxService {
  processOutboxMessages(): Promise<void>;
}

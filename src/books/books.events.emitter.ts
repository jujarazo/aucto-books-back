import { Injectable } from '@nestjs/common';
import EventEmitter from 'events';

@Injectable()
export class BooksEventsEmitter {
  private eventEmitter: EventEmitter = new EventEmitter();

  emitBookCreatedEvent() {
    this.eventEmitter.emit('bookCreated', {
      message: 'A new book was created',
    });
  }

  subscribeToBookCreatedEvent(listener: (...args: any[]) => void) {
    this.eventEmitter.on('bookCreated', listener);
  }

  unsubscribeFromBookCreatedEvent(listener: (...args: any[]) => void) {
    this.eventEmitter.off('bookCreated', listener);
  }
}

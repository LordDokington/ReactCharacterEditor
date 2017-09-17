import * as React from "react";
import { BaseView, ViewProps } from "../baseView";
import { StoryEvent } from "../../models/event";
import EventEdit from "./eventEdit"
import { SelectionGroup } from "../selectionGroup"

export interface EventViewProps extends ViewProps<StoryEvent> {
}

export default class EventView extends BaseView<StoryEvent> {
  constructor(props: EventViewProps) {
    super(props);
  }

  get optionValueForCurrentIndex(): string {
    const events: StoryEvent[] = this.props.objects;
    const idx = this.selectionIdx;
    return events[ idx ] ? events[ idx ].name : "";
  }

  render(): JSX.Element{
      const characters = this.props.objects;
      const isNew = this.state.isNew || characters.length == 0;
      const isEmptyView: boolean = isNew;

      const currentChar = isEmptyView ?
        { name: undefined, age: undefined, thumbnail: "" } : 
        characters[ this.selectionIdx ];

      return(
        <div>
          <div className="container" >
            <EventEdit
              {...currentChar}
              isNew={isNew}
              handleSubmitEvent={this.handleSubmitObject} 
              handleAbort={() => this.setNewMode(false)}
            />
          </div>
          <div className="container" >
            <SelectionGroup
              value={this.optionValueForCurrentIndex}
              listElements={ characters.map( (event: StoryEvent) => event.name )}
              handleSelect={this.updateIndex}
              handleNewButtonClick={() => this.setNewMode(true)}
              handleDeleteButtonClick={this.handleDeleteObject}
              deleteButtonVisible={this.props.objects.length > 0 && !isNew}
            />
          </div>
        </div>
      );
  }
}

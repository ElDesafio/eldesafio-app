import { Textarea } from '@chakra-ui/react';
import styled from '@emotion/styled';
import type { ToolbarItemUnion } from '@remirror/react';
import {
  ComponentItem,
  EditorComponent,
  Remirror,
  ThemeProvider,
  Toolbar,
  useRemirror,
} from '@remirror/react';
import { AllStyledComponent } from '@remirror/styles/emotion';
import type { FC } from 'react';
import { useCallback } from 'react';
import jsx from 'refractor/lang/jsx';
import typescript from 'refractor/lang/typescript';
import { ExtensionPriority } from 'remirror';
import {
  BlockquoteExtension,
  BoldExtension,
  BulletListExtension,
  CodeBlockExtension,
  CodeExtension,
  HardBreakExtension,
  HeadingExtension,
  ItalicExtension,
  LinkExtension,
  ListItemExtension,
  MarkdownExtension,
  OrderedListExtension,
  PlaceholderExtension,
  StrikeExtension,
  TableExtension,
  TrailingNodeExtension,
  UnderlineExtension,
} from 'remirror/extensions';
import { ClientOnly } from 'remix-utils';

export default { title: 'Editors / Markdown' };

export interface MarkdownEditorProps {
  placeholder?: string;
  initialContent?: string;
  editable?: boolean;
}

type ResetStylesProps = {
  noEditable?: boolean;
};

const ResetStyles = styled.div<ResetStylesProps>`
  ol,
  ul {
    margin-block-start: 1em !important;
    margin-block-end: 1em !important;
    margin-inline-start: 0px !important;
    margin-inline-end: 0px !important;
    padding-inline-start: 40px !important;
  }
  .ProseMirror {
    border-width: 1px !important;
    box-shadow: none !important;
    border-radius: 6px !important;
    overflow: hidden !important;
    &:focus {
      z-index: 1;
      border-color: #3182ce !important;
      box-shadow: 0 0 0 1px #3182ce !important;
    }
  }
  .remirror-toolbar {
    .remirror-button {
      border-color: rgb(226, 232, 240) !important;
      &:hover {
        background-color: rgb(43, 108, 176) !important;
      }
    }
    .remirror-button-active {
      background-color: rgb(49, 130, 206) !important;
    }
  }
  ${({ noEditable }) =>
    noEditable === true
      ? `.ProseMirror {
      padding: 0 !important;
      border: 0 !important;
    }`
      : ''}
`;

/**
 * The editor which is used to create the annotation. Supports formatting.
 */
export const MarkdownEditor: FC<MarkdownEditorProps> = ({
  placeholder,
  initialContent,
  children,
  editable = true,
}) => {
  const extensions = useCallback(
    () => [
      new PlaceholderExtension({ placeholder }),
      new LinkExtension({ autoLink: true }),
      new BoldExtension(),
      new UnderlineExtension(),
      new StrikeExtension(),
      new ItalicExtension(),
      new HeadingExtension(),
      new LinkExtension(),
      new BlockquoteExtension(),
      new BulletListExtension({ enableSpine: true }),
      new OrderedListExtension(),
      new ListItemExtension({
        priority: ExtensionPriority.High,
        enableCollapsible: true,
      }),
      new CodeExtension(),
      new CodeBlockExtension({ supportedLanguages: [jsx, typescript] }),
      new TrailingNodeExtension(),
      new TableExtension(),
      new MarkdownExtension({ copyAsMarkdown: false }),
      /**
       * `HardBreakExtension` allows us to create a newline inside paragraphs.
       * e.g. in a list item
       */
      new HardBreakExtension(),
    ],
    [placeholder],
  );

  const { manager } = useRemirror({
    extensions,
    stringHandler: 'markdown',
  });

  return (
    <ResetStyles noEditable={!editable}>
      <AllStyledComponent>
        <ThemeProvider>
          <ClientOnly fallback={<Textarea />}>
            {() => (
              <Remirror
                manager={manager}
                initialContent={initialContent}
                editable={editable}
              >
                {editable && (
                  <Toolbar
                    items={toolbarItems}
                    refocusEditor
                    label="Top Toolbar"
                  />
                )}
                <EditorComponent />
                {children}
              </Remirror>
            )}
          </ClientOnly>
        </ThemeProvider>
      </AllStyledComponent>
    </ResetStyles>
  );
};

const toolbarItems: ToolbarItemUnion[] = [
  {
    type: ComponentItem.ToolbarGroup,
    label: 'Simple Formatting',
    items: [
      {
        type: ComponentItem.ToolbarCommandButton,
        commandName: 'toggleBold',
        display: 'icon',
      },
      {
        type: ComponentItem.ToolbarCommandButton,
        commandName: 'toggleItalic',
        display: 'icon',
      },
      {
        type: ComponentItem.ToolbarCommandButton,
        commandName: 'toggleUnderline',
        display: 'icon',
      },
      {
        type: ComponentItem.ToolbarCommandButton,
        commandName: 'toggleStrike',
        display: 'icon',
      },
    ],
    separator: 'end',
  },
  {
    type: ComponentItem.ToolbarGroup,
    label: 'Heading Formatting',
    items: [
      {
        type: ComponentItem.ToolbarCommandButton,
        commandName: 'toggleHeading',
        display: 'icon',
        attrs: { level: 1 },
      },
      {
        type: ComponentItem.ToolbarCommandButton,
        commandName: 'toggleHeading',
        display: 'icon',
        attrs: { level: 2 },
      },
      {
        type: ComponentItem.ToolbarCommandButton,
        commandName: 'toggleHeading',
        display: 'icon',
        attrs: { level: 3 },
      },
    ],
    separator: 'end',
  },
  {
    type: ComponentItem.ToolbarGroup,
    label: 'Simple Formatting',
    items: [
      {
        type: ComponentItem.ToolbarCommandButton,
        commandName: 'toggleBlockquote',
        display: 'icon',
      },
    ],
    separator: 'end',
  },
  {
    type: ComponentItem.ToolbarGroup,
    label: 'Lists',
    items: [
      {
        type: ComponentItem.ToolbarCommandButton,
        commandName: 'toggleBulletList',
        display: 'icon',
      },
      {
        type: ComponentItem.ToolbarCommandButton,
        commandName: 'toggleOrderedList',
        display: 'icon',
      },
      {
        type: ComponentItem.ToolbarCommandButton,
        commandName: 'toggleTaskList',
        display: 'icon',
      },
    ],
    separator: 'end',
  },
  {
    type: ComponentItem.ToolbarGroup,
    label: 'History',
    items: [
      {
        type: ComponentItem.ToolbarCommandButton,
        commandName: 'undo',
        display: 'icon',
      },
      {
        type: ComponentItem.ToolbarCommandButton,
        commandName: 'redo',
        display: 'icon',
      },
      {
        type: ComponentItem.ToolbarCommandButton,
        commandName: 'toggleColumns',
        display: 'icon',
        attrs: { count: 2 },
      },
    ],
    separator: 'none',
  },
];

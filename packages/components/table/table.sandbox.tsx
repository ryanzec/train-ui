import Table, { TableShape } from '$/components/table';
import styles from '$/components/table/table.sandbox.module.css';
import ExpandableCode from '$sandbox/components/expandable-code';
import SandboxExamplesContainer from '$sandbox/components/sandbox-examples-container/sandbox-examples-container';
import { For, createSignal } from 'solid-js';

export default {
  title: 'Components/Table',
};

type TableData = {
  id: string;
  name: string;
  email: string;
  role: string;
};

const tableData: TableData[] = [];

for (let i = 0; i < 5; i++) {
  tableData.push({
    id: `${i}`,
    name: 'John Doe',
    email: '2e5wF@example.com',
    role: 'Admin',
  });
}

const largeTableData: TableData[] = [];

for (let i = 0; i < 500; i++) {
  largeTableData.push({
    id: `${i}`,
    name: 'John Doe',
    email: '2e5wF@example.com',
    role: 'Admin',
  });
}

export const Square = () => {
  return (
    <SandboxExamplesContainer>
      <div>
        <div>Header / Footer</div>
        <Table
          shape={TableShape.SQUARE}
          tableHead={
            <Table.Row>
              <Table.Header class={styles.nameCell}>Name</Table.Header>
              <Table.Header class={styles.emailCell}>Email</Table.Header>
              <Table.Header>Role</Table.Header>
            </Table.Row>
          }
          tableFooter="Footer Content"
        >
          <For each={tableData}>
            {(row) => {
              return (
                <Table.Row>
                  <Table.Data class={styles.nameCell}>{row.name}</Table.Data>
                  <Table.Data class={styles.emailCell}>{row.email}</Table.Data>
                  <Table.Data>{row.role}</Table.Data>
                </Table.Row>
              );
            }}
          </For>
        </Table>
      </div>
      <div>
        <div>No Header</div>
        <Table shape={TableShape.SQUARE} tableFooter="Footer Content">
          <For each={tableData}>
            {(row) => {
              return (
                <Table.Row>
                  <Table.Data class={styles.nameCell}>{row.name}</Table.Data>
                  <Table.Data class={styles.emailCell}>{row.email}</Table.Data>
                  <Table.Data>{row.role}</Table.Data>
                </Table.Row>
              );
            }}
          </For>
        </Table>
      </div>
      <div>
        <div>No Footer</div>
        <Table
          shape={TableShape.SQUARE}
          tableHead={
            <Table.Row>
              <Table.Header class={styles.nameCell}>Name</Table.Header>
              <Table.Header class={styles.emailCell}>Email</Table.Header>
              <Table.Header>Role</Table.Header>
            </Table.Row>
          }
        >
          <For each={tableData}>
            {(row) => {
              return (
                <Table.Row>
                  <Table.Data class={styles.nameCell}>{row.name}</Table.Data>
                  <Table.Data class={styles.emailCell}>{row.email}</Table.Data>
                  <Table.Data>{row.role}</Table.Data>
                </Table.Row>
              );
            }}
          </For>
        </Table>
      </div>
      <div>
        <div>No Header / Footer</div>
        <Table shape={TableShape.SQUARE}>
          <For each={tableData}>
            {(row) => {
              return (
                <Table.Row>
                  <Table.Data class={styles.nameCell}>{row.name}</Table.Data>
                  <Table.Data class={styles.emailCell}>{row.email}</Table.Data>
                  <Table.Data>{row.role}</Table.Data>
                </Table.Row>
              );
            }}
          </For>
        </Table>
      </div>
    </SandboxExamplesContainer>
  );
};

export const Rounded = () => {
  return (
    <SandboxExamplesContainer>
      <div>
        <div>Header / Footer</div>
        <Table
          shape={TableShape.ROUNDED}
          tableHead={
            <Table.Row>
              <Table.Header class={styles.nameCell}>Name</Table.Header>
              <Table.Header class={styles.emailCell}>Email</Table.Header>
              <Table.Header>Role</Table.Header>
            </Table.Row>
          }
          tableFooter="Footer Content"
        >
          <For each={tableData}>
            {(row) => {
              return (
                <Table.Row>
                  <Table.Data class={styles.nameCell}>{row.name}</Table.Data>
                  <Table.Data class={styles.emailCell}>{row.email}</Table.Data>
                  <Table.Data>{row.role}</Table.Data>
                </Table.Row>
              );
            }}
          </For>
        </Table>
      </div>
      <div>
        <div>No Header</div>
        <Table shape={TableShape.ROUNDED} tableFooter="Footer Content">
          <For each={tableData}>
            {(row) => {
              return (
                <Table.Row>
                  <Table.Data class={styles.nameCell}>{row.name}</Table.Data>
                  <Table.Data class={styles.emailCell}>{row.email}</Table.Data>
                  <Table.Data>{row.role}</Table.Data>
                </Table.Row>
              );
            }}
          </For>
        </Table>
      </div>
      <div>
        <div>No Footer</div>
        <Table
          shape={TableShape.ROUNDED}
          tableHead={
            <Table.Row>
              <Table.Header class={styles.nameCell}>Name</Table.Header>
              <Table.Header class={styles.emailCell}>Email</Table.Header>
              <Table.Header>Role</Table.Header>
            </Table.Row>
          }
        >
          <For each={tableData}>
            {(row) => {
              return (
                <Table.Row>
                  <Table.Data class={styles.nameCell}>{row.name}</Table.Data>
                  <Table.Data class={styles.emailCell}>{row.email}</Table.Data>
                  <Table.Data>{row.role}</Table.Data>
                </Table.Row>
              );
            }}
          </For>
        </Table>
      </div>
      <div>
        <div>No Header / Footer</div>
        <Table shape={TableShape.ROUNDED}>
          <For each={tableData}>
            {(row) => {
              return (
                <Table.Row>
                  <Table.Data class={styles.nameCell}>{row.name}</Table.Data>
                  <Table.Data class={styles.emailCell}>{row.email}</Table.Data>
                  <Table.Data>{row.role}</Table.Data>
                </Table.Row>
              );
            }}
          </For>
        </Table>
      </div>
    </SandboxExamplesContainer>
  );
};

export const LargeData = () => {
  return (
    <SandboxExamplesContainer>
      <Table
        shape={TableShape.SQUARE}
        tableHead={
          <Table.Row>
            <Table.Header class={styles.nameCell}>Name</Table.Header>
            <Table.Header class={styles.emailCell}>Email</Table.Header>
            <Table.Header>Role</Table.Header>
          </Table.Row>
        }
        tableFooter="Footer Content"
      >
        <For each={largeTableData}>
          {(row) => {
            return (
              <Table.Row>
                <Table.Data class={styles.nameCell}>{row.name}</Table.Data>
                <Table.Data class={styles.emailCell}>{row.email}</Table.Data>
                <Table.Data>{row.role}</Table.Data>
              </Table.Row>
            );
          }}
        </For>
      </Table>
    </SandboxExamplesContainer>
  );
};

export const Scrollable = () => {
  return (
    <SandboxExamplesContainer>
      <div class={styles.scrollable}>
        <Table
          shape={TableShape.SQUARE}
          tableHead={
            <Table.Row>
              <Table.Header class={styles.nameCell}>Name</Table.Header>
              <Table.Header class={styles.emailCell}>Email</Table.Header>
              <Table.Header>Role</Table.Header>
            </Table.Row>
          }
          tableFooter="Footer Content"
        >
          <For each={largeTableData}>
            {(row) => {
              return (
                <Table.Row>
                  <Table.Data class={styles.nameCell}>{row.name}</Table.Data>
                  <Table.Data class={styles.emailCell}>{row.email}</Table.Data>
                  <Table.Data>{row.role}</Table.Data>
                </Table.Row>
              );
            }}
          </For>
        </Table>
      </div>
    </SandboxExamplesContainer>
  );
};

export const FixedHeader = () => {
  return (
    <SandboxExamplesContainer>
      <div class={styles.scrollable}>
        <Table
          hasFixedHeader
          shape={TableShape.SQUARE}
          tableHead={
            <Table.Row>
              <Table.Header class={styles.nameCell}>Name</Table.Header>
              <Table.Header class={styles.emailCell}>Email</Table.Header>
              <Table.Header>Role</Table.Header>
            </Table.Row>
          }
          tableFooter="Footer Content"
        >
          <For each={largeTableData}>
            {(row) => {
              return (
                <Table.Row>
                  <Table.Data class={styles.nameCell}>{row.name}</Table.Data>
                  <Table.Data class={styles.emailCell}>{row.email}</Table.Data>
                  <Table.Data>{row.role}</Table.Data>
                </Table.Row>
              );
            }}
          </For>
        </Table>
      </div>
    </SandboxExamplesContainer>
  );
};

export const Selectable = () => {
  const [selectedIds, setSelectedIds] = createSignal<string[]>([]);

  const handleSelected = (id: string) => {
    console.log(id);
    const isSelected = selectedIds().includes(id);

    if (isSelected) {
      setSelectedIds(selectedIds().filter((selectedId) => selectedId !== id));

      return;
    }

    setSelectedIds([...selectedIds(), id]);
  };

  return (
    <SandboxExamplesContainer>
      <div>Header / Footer</div>
      <Table
        shape={TableShape.SQUARE}
        tableHead={
          <Table.Row>
            <Table.Header />
            <Table.Header class={styles.nameCell}>Name</Table.Header>
            <Table.Header class={styles.emailCell}>Email</Table.Header>
            <Table.Header>Role</Table.Header>
          </Table.Row>
        }
        tableFooter="Footer Content"
      >
        <For each={tableData}>
          {(row) => {
            return (
              <Table.Row isSelectable isSelected={false} onSelected={handleSelected} id={row.id}>
                <Table.Data class={styles.nameCell}>{row.name}</Table.Data>
                <Table.Data class={styles.emailCell}>{row.email}</Table.Data>
                <Table.Data>{row.role}</Table.Data>
              </Table.Row>
            );
          }}
        </For>
      </Table>
      <ExpandableCode label="Selected Ids">{JSON.stringify(selectedIds(), null, 2)}</ExpandableCode>
    </SandboxExamplesContainer>
  );
};

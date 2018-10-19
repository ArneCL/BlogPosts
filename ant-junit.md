title: Ant junit
date: 2012-4-7 23:13:30
tags: ant,ant-junit

The junit tag take in a formatter tag to define the output, and classpath so it can find the classes, and a fileset within a batchtest tag to say where the test classes are (`**` means recursive).

	<target name="junit" depends="compile">
		<junit printsummary="on" fork="true" haltonfailure="yes">
			<formatter type="plain" />
			<classpath refid="junit.class.path" />
			<batchtest todir="${test.report.dir}">
				<fileset dir="${src.dir}">
					<include name="**/*Test.java" />
				</fileset>
			</batchtest>
		</junit>
	</target>	

The printsummary, fork and haltonfailure options does as you would expect. Batchtest uses the report dir to place the reports. You can go there to see the test output.
